const { IdeaService } = require('../services/idea.service');

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

    async getAllIdeas(req, res) {
        try {
            const filterType = req.query.filterBy;
        } catch (e) {

        }

        const { id_employee, id_organization } = req.tokenPayload;

        let ideas = null;

        if (filterType === 'employee') {
            ideas = await IdeaService.getPostsByUserId(id_employee);
        } else {
            ideas = await  IdeaService.getPostsByOrganization(id_organization)
        }

        if (ideas) {
            res.status(200).json({
                status: true,
                ideas,
                length: ideas.length
            })
        }

        res.status(404).json({
            status: false,
            message: 'Идеи отсутствуют'
        })
    }
}

module.exports.IdeaController = new IdeaController();
