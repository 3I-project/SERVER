const { CommentModel } = require('../db/models/comment.model');

class CommentService {
    async getCommentsByIdeaId(id_idea) {
       const comments = await CommentModel.findAll({ where: {id_idea : id_idea}})

       return comments;
    }
}

module.exports.CommentService = new CommentService();