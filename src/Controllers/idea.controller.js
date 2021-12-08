const { IdeaService } = require('../Services/idea.service');

const { tokenService } = require('../Services/token.service');

class IdeaController {

    async createIdea(req, res) {
        try {
            const reqPayload = req.body;

            const saveIdea = await IdeaService.createIdea(reqPayload, req.tokenPayload);

            if(!saveIdea) {
                throw new Error('Не удалось добавить идею')
            }

            res.status(200).json({
                status: true,
                file: 'Идея успешно добавлена'
            })
        } catch(err) {
            res.status(400).json({
                status: false,
                msg: err.message
            })
        }
    }

    getAllIdeas(req, res) {

    }
}

module.exports.IdeaController = new IdeaController();
