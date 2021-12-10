const router = require('express').Router();

const { IdeaController } = require('../Controllers/idea.controller');

const AuthProtect = require('../middleware/authorizationProtection.middleware');

router.post('/create', AuthProtect, IdeaController.createIdea);

router.get('/posts', AuthProtect,IdeaController.getAllIdeas);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/idea`, router);
}
