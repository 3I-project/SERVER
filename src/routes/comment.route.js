const router = require('express').Router();

const {CommentController} = require('../controllers/comment.controller');
const AuthProtect = require('../middleware/authorizationProtection.middleware');

router.post('/create', AuthProtect, CommentController.createComment);
router.get('/', AuthProtect, CommentController.getComments);

module.exports.init = (app, apiVersoin) => {
    app.use(`${apiVersoin}/comments`, router);
  };