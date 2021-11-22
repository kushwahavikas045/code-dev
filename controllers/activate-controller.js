const userService = require('../service/user-service');
const jimp = require('jimp');
const path = require('path');
class ActivateController { 

 async activate(req, res){
     
    const {name, image} = req.body;

    if(!image || !name){
        res.status(400).json({message: 'image field required'});
    }

    //base64 image 
    const buffer = Buffer.from(image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
     
        //compress image
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;
        // 32478362874-3242342342343432.png
    
        try {
            const jimResp = await jimp.read(buffer);
        jimResp.resize(150, jimp.AUTO)
        .write(path.resolve(__dirname,`../storage/${imagePath}`));
        } catch (error) {
            res.status(500).json({message:'image could not processed'});
        }
    
        //update user
        const userId = req.user._id;
    
        const user = await userService.findUser({_id: userId});
        if(!user){
            res.status(404).json({message:'User not found'});
        }
    
        user.activated = true;
        user.name = name;
        user.avatar =`${process.env.BASE_URL}/storage/${imagePath}`;
        user.save();
        
        res.json({user, auth: true});
      
  }

  async unactivate(req, res){
      try {
        const user = userService.deleteAccount({_id: req.user._id});
        const profile = userService.deleteProfile({user: req.user._id}); 
        if(!user ){
            res.status(404).json({message:'user not found'});
        }
        res.json({message:'delete account succcessful'});
      } catch (error) {
          console.log(error.message);
         res.status(404).josn({message:'someting went wrong, try later!'});
      }
  }

}
module.exports = new ActivateController();