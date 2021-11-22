const Profile = require('../models/Profile');
class ProfileService{
   
    async findProfile(data){
      const profile = await Profile.findOne(data);
      return profile; 
    }

   async createProfile(data){
      const profile = await Profile.create(data);
      return profile;
    }

   async updateProfile(data, profileFields){
       const profile = await Profile.findOneAndUpdate(data, {$set: profileFields}, {$new: true});
       return profile;
    }

    async allProfilesData(){
      const profile = await Profile.find({}).populate('user',['name', 'avatar']);
      return profile;
    }

    async profileById(data){
        const profile = await Profile.findOne(data).populate('user', ['name', 'avatar']);
        return profile;
    }


}
module.exports = new ProfileService();