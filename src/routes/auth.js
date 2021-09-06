const router = require('express').Router();

const { authController } = require('../Controllers/auth.controller');

router.get('/registration', authController.registration);

module.exports.init = (app, apiVersoin) => {
  app.use(`${apiVersoin}/auth`, router);
};