const User = require("../models/User");
const Profile = require("../models/Profile");
class UserService{

  //find user
 async findUser(filter){
      const user = await User.findOne(filter);
      return user;
  }
  
  //create user

  async createUser(data){
      const user = await User.create(data);
      return user;
  }

  //delete account
  async deleteAccount(data){
    const user = await User.findOneAndRemove({data});
    
    return user;
  }
  async deleteProfile(data){
    const profile = await Profile.findOneAndRemove({data});
    return profile;
  }

  

}
module.exports = new UserService();