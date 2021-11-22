const EmailService = require("../service/Email-service");
const hashService = require("../service/hash-service");
const otpServer = require("../service/otp-service");
const tokenService = require("../service/token-service");
const userService = require("../service/user-service");

class AuthController {
   async sendOtp(req, res){
         const {email} = req.body;

         if(!email){
             return res.status(400).json({message: 'Email is required'});
         }

         const otp = await otpServer.genrateOtp();

         //genrate hash
            const ttl = 1000 * 60 * 2;
            const expires = Date.now() + ttl;
            const data = `${email}.${otp}.${expires}`;

         const hash = hashService.hashOtp(data);

         //sendEmail
          try {
            
            await otpServer.sendByEmail(email, otp);
            
            res.json({
                hash:`${hash}.${expires}`,
                email: email,
            })
            
          } catch (error) {
            return res.status(500).json({message:'something went wrong in sending email'});  
          }
    }

    async verifyOtp(req, res){
        //take data from req.body; 

        const{hash, otp, email} = req.body;

        //validation
         if(!hash || !otp ||!email){
             res.status(400).json({message: 'all fields are required'});
         }
        //split experies time and hash data
         const[hashOtp, expires] = hash.split('.');

        //check otp is exprers or not

        if(Date.now() > +expires){
            return res.status(401).json({message:'otp is expire'});
        }

        //if otp is not expires then

        const data = `${email}.${otp}.${expires}`;

        const isValid = otpServer.verifyOtp(hashOtp, data);

        //check otp is valid or not
        if(!isValid){
            res.status(400).json({message:' otp is not valid'});
        }

        //after valid otp create user
        let user;
           
        try {
            user = await userService.findUser({email: email});

            if(!user){
               user =  await userService.createUser({email: email})
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message:'db error'});
        }

        //token
         const{ accessToken, refreshToken } = tokenService.genrateToken({_id: user._id, activated: false});

         await tokenService.storeToken(refreshToken, user._id);

         res.cookie('refreshToken', refreshToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

         res.json({user, auth: true});
    }

    async refresh(req, res){
        // get refresh token from cookie
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        // check if token is valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        // Check if token is in db
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // check if valid user
        const user = await userService.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }
        // Generate new tokens
        const {accessToken, refreshToken} = tokenService.genrateToken({_id: user._id, activated: false});
 
        // Update refresh token
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
 
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // response
        
        res.json({ user, auth: true });
    }

    async logout (req, res){
        const {refreshToken} = req.cookies;

        //remove from database
        tokenService.removeRefreshToken(refreshToken);;

        //clear access and refreshToken
         res.clearCookie('accessToken');
         res.clearCookie('refreshToken');

         //response
         res.json({user:null, auth:false});
    }
 
}

module.exports = new AuthController();