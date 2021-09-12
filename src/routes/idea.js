const router = require('express').Router();

const { IdeaController } = require('../Controllers/idea.controller');

router.post('/create', IdeaController.createPost);

router.get('/posts', IdeaController.getAllPosts);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/idea`);
}