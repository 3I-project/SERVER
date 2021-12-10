const { IdeaService } = require('../services/idea.service');
const { AuthService } = require('../services/auth.service');

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
        const filterType = req.query.filterBy;

        const { id_employee, id_organization } = req.tokenPayload;

        let ideas = null;

        if (filterType === 'employee') {
            ideas = await IdeaService.getPostsByUserId(id_employee);
        } else if (filterType === 'organization' || !filterType) {
            ideas = await  IdeaService.getPostsByOrganization(id_organization)

            for (let i = 0; i < ideas.length; i++) {
                const id_employee = ideas[i].dataValues.id_employee;
                let { first_name, last_name, isLeader, reg_date } = await AuthService.getUserById(id_employee, 'employee')

                ideas[i].dataValues.author = {
                    first_name,
                    last_name,
                    isLeader,
                    reg_date
                }
            }
        }

        if (ideas) {
            res.status(200).json({
                status: true,
                ideas: ideas,
                length: ideas.length
            })
        }

        res.status(404).json({
            status: false,
            message: 'Идеи отсутствуют'
        })
    }

    async filterIdeas() {}
}

module.exports.IdeaController = new IdeaController();
