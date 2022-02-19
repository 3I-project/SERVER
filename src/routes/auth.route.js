const router = require('express').Router();

const { authController } = require('../controllers/auth.controller');
const AuthProtect = require('../middleware/authorizationProtection.middleware');

router.post('/authorization', authController.authorization);
router.post('/registration', authController.registration);

router.post('/check-mail', authController.checkEmail);
router.post('/check-login', authController.checkLogin);

router.get('/refresh', authController.refreshTokens);
router.get('/me', AuthProtect, authController.getMe);

module.exports.init = (app, apiVersoin) => {
  app.use(`${apiVersoin}/auth`, router);
};
