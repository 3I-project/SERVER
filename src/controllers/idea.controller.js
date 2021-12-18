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
                let comments = await CommentService.getCommentsByIdeaId(ideas[i].dataValues.id_idea);

                ideas[i].dataValues.author = {
                    first_name,
                    last_name,
                    isLeader,
                    reg_date
                }

                ideas[i].dataValues.commentsLength = comments.length;
            }
        }

        if (ideas) {
            res.status(200).json({
                status: true,
                ideas: ideas,
                length: ideas.length
            })
        } else {
            res.status(404).json({
                status: false,
                message: 'Идеи отсутствуют'
            })
        }
    }

    async getIdea (req, res) {
        try {
            const id = req.query.id;

            const idea = await IdeaService.getPostByIdeaId(id);

            const { id_employee } = idea;
            const { first_name, last_name, isLeader, reg_date } = await AuthService.getUserById(id_employee, 'employee');
            
            idea.dataValues.author = {
                first_name,
                last_name,
                isLeader,
                reg_date
            }

            res.status(200).json({
                status: true,
                idea
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                msg: 'Не удалось получить идею'
            })
        }
    }

    async filterIdeas(req, res) {
        const filterString = req.query.q;

        const { id_organization } = req.tokenPayload;

        const filterItems = await IdeaService.filterBySubString(id_organization, filterString);

        for (let i = 0; i < filterItems.length; i++) {
            const id_employee = filterItems[i].dataValues.id_employee;
            let { first_name, last_name, isLeader, reg_date } = await AuthService.getUserById(id_employee, 'employee')
            

            filterItems[i].dataValues.author = {
                first_name,
                last_name,
                isLeader,
                reg_date
            }
        }

        res.status(200).json({
            status: true,
            filter: filterItems
        })
    }
}

module.exports.IdeaController = new IdeaController();
