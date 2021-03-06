const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: './temp/' });

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

const contactGet = require('../controllers/contacts/get');
const contactAdd = require('../controllers/contacts/create');
const contactDelete = require('../controllers/contacts/delete');

const productGet = require('../controllers/products/get');
const productAdd = require('../controllers/products/create');
const productDelete = require('../controllers/products/delete');

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.post('/user/view', userView);
router.post('/user/reset-password', userResetPassword);
router.get('/user/verify-email/:username/:verificationCode', userVerifyEmail);
router.patch('/user/update-email', authenticate, userUpdateEmail);
router.patch('/user/update-picture', authenticate, upload.single('file'), userUpdatePicture);
router.patch('/user/update-profile', authenticate, userUpdateProfile);
router.patch('/user/update-password', authenticate, userUpdatePassword);
router.delete('/user/delete', authenticate, userDelete);

router.get('/contact/get', authenticate, contactGet);
router.post('/contact/add', authenticate, contactAdd);
router.delete('/contact/delete', authenticate, contactDelete);

router.get('/product/get', authenticate, productGet);
router.post('/product/add', authenticate, upload.single('file'), productAdd);
router.delete('/product/delete', authenticate, productDelete);

module.exports = router;
