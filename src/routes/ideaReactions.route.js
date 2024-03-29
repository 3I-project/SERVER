const router = require('express').Router();

const AuthProtect = require('../middleware/authorizationProtection.middleware');

const { IdeaReactionsController } = require('../controllers/ideaReactions.controller');

router.post('/set', AuthProtect, IdeaReactionsController.setReaction);

router.get('/', AuthProtect, IdeaReactionsController.getIdeaReactions);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/reaction`, router);
}
