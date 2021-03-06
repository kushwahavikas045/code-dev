const router = require('express').Router();
const AuthController = require('./controllers/auth-controller');
const ActivateController = require('./controllers/activate-controller');
const ProfileController = require('./controllers/profile-controller');
const auth = require('./middlewares/auth');
router.get('/api/profile/me', auth, ProfileController.currentUser);
router.get('/api/profiles', ProfileController.allProfiles);
router.get('/api/profileById/:user_id', ProfileController.profileById);
router.delete('/api/user/unactivated', auth, ActivateController.unactivate);
router.post('/api/send-otp', AuthController.sendOtp);
router.post('/api/verify-otp', AuthController.verifyOtp);
router.post('/api/activate', auth, ActivateController.activate);
router.get('/api/refresh', AuthController.refresh);
router.post('/api/logout', auth, AuthController.logout);
router.post('/api/profile', auth, ProfileController.createProfile);
router.put('/api/add-education', auth, ProfileController.addEducation);
module.exports = router;