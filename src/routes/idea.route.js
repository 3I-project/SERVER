const router = require('express').Router();

const { IdeaController } = require('../controllers/idea.controller');

const AuthProtect = require('../middleware/authorizationProtection.middleware');

router.post('/create', AuthProtect, IdeaController.createIdea);

router.get('/posts', AuthProtect, IdeaController.getAllIdeas);
router.get('/filter', AuthProtect, IdeaController.filterIdeas);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/idea`, router);
}
