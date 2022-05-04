
const { IdeaService } = require('../services/idea.service');
const { IdeaReactionsService } = require('../services/ideaReactions.service');

class IdeaReactionsController {

    async setReaction(req, res) {
        try {
            const {
                idea_id,
                type
            } = req.body;

            const {
                id_employee,
                id_organization
            } = req.tokenPayload;

            const existIdea = await IdeaService.getPostByIdeaId(idea_id);

            if (!existIdea) {
                throw new Error("Пост не найден")
            }

            const setReaction = await IdeaReactionsService.setReaction(id_employee, id_organization, {idea_id, type})

            if (!setReaction) {
                throw new Error("Не удалось добавить \/ обновить реакцию на идею")
            }

            return res.success(200, {
                msg: 'Успешно'
            })
        } catch (err) {
            return res.httpError(400, {
                message: err.message
            })
        }
    }

    async getIdeaReactions(req, res) {
        const { idea_id } = req.query;
        console.log(idea_id)
        if (!idea_id) {
            return res.httpError(400, {
                msg: "idea_id not found"
            })
        }

        const {likes, dislikes} = await IdeaReactionsService.getIdeaReactions(idea_id);

        return res.success(200, {
            likes: likes.length,
            dislikes: dislikes.length
        })
    }
}

module.exports.IdeaReactionsController = new IdeaReactionsController();
