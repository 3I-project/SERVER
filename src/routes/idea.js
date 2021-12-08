const router = require('express').Router();

const { IdeaController } = require('../Controllers/idea.controller');

router.post('/create', IdeaController.createIdea);

// router.get('/posts', IdeaController.getAllIdeas);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/idea`, router);
}
