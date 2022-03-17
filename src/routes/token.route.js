const router = require('express').Router()

const {TokenController} = require('../controllers/token.controller')

router.post('/validate', TokenController.validateToken);

module.exports.init = (app, apiVersoin) => {
    app.use(`${apiVersoin}/token`, router);
};
