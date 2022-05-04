
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
                throw new Error("Поста с таким id не найдено")
            }

            const updateIdea = await IdeaReactionsService.setReaction(id_employee, id_organization, {idea_id, type})
            console.log(updateIdea)

            return res.success(200, {
                msg: 'Успешно'
            })
        } catch (err) {
            console.log(err)
            return res.httpError(400, {
                message: err
            })
        }
    }
}

module.exports.IdeaReactionsController = new IdeaReactionsController();
