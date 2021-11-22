const tokenService = require("../service/token-service");

module.exports = async function(req, res, next){
    try {
        //take accesstoken from cookies
         const {accessToken} = req.cookies;  
        //check if accesstoken is avaliable or not
         if(!accessToken){
             throw new Error();
         }
        //then verify accesstoken and store in request variable
        const user = await tokenService.verifyAccessToken(accessToken);
        
        //user is not find then
        if(!user){
            throw new Error();
        }

        req.user = user;

        console.log(accessToken);
        //then pass next function
        next();
    } catch (error) {
        res.status(401).json({message: 'invalid token'})
    }
}