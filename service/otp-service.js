const crypto = require('crypto');
const nodemailer = require('nodemailer');
const EmailService = require('./Email-service');
const hashService = require('./hash-service');
class OtpService{
   
  async genrateOtp(){

    const otp = crypto.randomInt(1000, 9999);
     return otp;
   }

    async sendByEmail(email, otp){
      const transporter = nodemailer.createTransport({
         service:'gmail',
         auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
         }
      });

      const mailOption = {
         from:process.env.MAIL_USER,
         to: email,
         subject: 'CodeDev',
         text: `${otp} is Send for Verfication from CodeDev`,
         html: EmailService.emailTemples({
                 otp : otp,
                 expires: '2 min',
         })
            } 

         transporter.sendMail(mailOption, (err, info) =>{
            if(err){
               console.log(err);
            }else{
               console.log('Email send' + info.response);
            }
         })   

   }

   verifyOtp(hashOtp, data){
     const computedHash = hashService.hashOtp(data);
     
     return computedHash === hashOtp;

   } 

}

module.exports = new OtpService();