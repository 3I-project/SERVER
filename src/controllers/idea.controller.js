const { IdeaService } = require('../services/idea.service');
const { AuthService } = require('../services/auth.service');
const { CommentService } = require('../services/comment.service');

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

    async updateIdea(req, res) {
        try {
            const reqPayload = req.body;

            const updateIdea = await IdeaService.updateIdea(reqPayload, req.tokenPayload);

            if (!updateIdea[0]) {
                throw new Error('Не удалось обновить идею')
            }

            res.status(200).json({
                status: true,
                file: 'Идея успешно обновлена'
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
        }

        if (ideas) {
            res.success(200, {
                ideas: ideas,
                length: ideas.length
            })
        } else {
            res.httpError(404, {
                message: 'Идеи отсутствуют'
            })
        }
    }

    async getIdea (req, res) {
        try {
            const id = req.query.id;
            const idea = await IdeaService.getPostByIdeaId(id);

            res.status(200).json({
                idea
            })
        } catch (error) {
            console.log(error)
            res.httpError(400, {
                msg: 'Не удалось получить идею'
            })
        }
    }

    async filterIdeas(req, res) {
        const filterString = req.query.q;

        const { id_organization } = req.tokenPayload;

        const filterItems = await IdeaService.filterBySubString(id_organization, filterString);

        res.success(200, {
            filter: filterItems
        })
    }

    async getIdeaTypes(req, res) {
        const list = await IdeaService.getTypesList()

        res.success(200, list)
    }

    async getUserPosts(req, res) {
        const { id_user } = req.params

        if (!id_user) {
            res.httpError(400, {
                msg: 'id not found'
            })
        }

        const ideas = await IdeaService.getPostsByUserId(id_user)

        res.success(200, {
            ideas: ideas,
            length: ideas.length
        })
    }
}

module.exports.IdeaController = new IdeaController();
