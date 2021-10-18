const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/authenticate');

const userRegister = require('../controllers/users/register');
const userLogin = require('../controllers/users/login');
const userView = require('../controllers/users/view');
const userResetPassword = require('../controllers/users/forgotPassword');
const userVerifyEmail = require('../controllers/users/verifyEmail');
const userUpdateEmail = require('../controllers/users/updateEmail');
const userUpdatePicture = require('../controllers/users/updatePicture');
const userUpdateProfile = require('../controllers/users/updateProfile');
const userUpdatePassword = require('../controllers/users/updatePassword');
const userDelete = require('../controllers/users/delete');

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.post('/user/view', userView);
router.post('/user/reset-password', userResetPassword);
router.get('/user/verify-email/:username/:verificationCode', userVerifyEmail);
router.patch('/user/update-email', authenticate, userUpdateEmail);
router.patch('/user/update-picture', authenticate, userUpdatePicture);
router.patch('/user/update-profile', authenticate, userUpdateProfile);
router.patch('/user/update-password', authenticate, userUpdatePassword);
router.delete('/user/delete', authenticate, userDelete);

module.exports = router;
