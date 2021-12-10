const router = require('express').Router();

const { authController } = require('../controllers/auth.controller');
const AuthProtect = require('../middleware/authorizationProtection.middleware');

router.post('/authorization', authController.authorization);
router.post('/registration', authController.registration);

router.get('/me', AuthProtect, authController.getMe);

module.exports.init = (app, apiVersoin) => {
  app.use(`${apiVersoin}/auth`, router);
};
