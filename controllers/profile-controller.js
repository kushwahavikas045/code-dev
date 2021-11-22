const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const profileService = require('../service/Profile-service');
class ProfileController {
   async createProfile(req, res){
    // destructuring the request
		const {
            company,
			website,
			skills,
			location,
			status,
			github,
			linkedin,
		} = req.body;

        //create empty object
        const profileFields = {};
        profileFields.user = req.user._id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(github) profileFields.github  = github;
        if(linkedin) profileFields.linkedin = linkedin;
        if(skills){
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        
        let profile;

        try {
            profile = await profileService.findProfile({user: req.user._id});

            if(profile){
                profile = await profileService.updateProfile({user: req.user._id}, profileFields);
                return res.json(profile);
            }

            if(!profile){
                profile = await profileService.createProfile(profileFields);
                return res.json(profile);
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).json({message: 'Server error'});
        }
        

    }

    //current user profile

  async currentUser(req, res){
        
        try {
            const profile = await profileService.findProfile({user: req.user._id});
             res.json(profile);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: 'Profile not found try again'});
        }
    }

   async allProfiles(req, res){
       try {
           const profile = await profileService.allProfilesData();
           res.json(profile);
       } catch (error) {
           console.log(error.message);
           res.status(500).json({message:'profiles is not found, try again!'})
           
       }
   } 

   async profileById(req, res){
       try {
       
           const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);
           if(!profile){
               res.status(404).json({mesage:'profile not found'});
           }
           res.json(profile);
       } catch (error) {
           if(error.kind == 'ObjectId'){
           console.log(error.message);
        }
           res.status(500).json({message:'profileById is not found, try again!'})
       }
   }

   async addEducation(req, res){
       try {
           const {school, degree, descripation, fieldofstudy, to, current} = req.body;

           if(!school || !degree || !descripation || !fieldofstudy ){
               res.status(400).json({message:'All fields are required.'});
           }
           

           const profile = await Profile.findOne({ user: req.user._id})
           
           profile.education.unshift(req.body);

           profile.save();

          res.json(profile);

       } catch (error) {
           console.log(error.message);
           res.status(500).json({message:{
               profile: 'First, add profile',
               network:' check network connection',
               server: 'server error '
           }})
       }
   }
}

module.exports = new ProfileController();