const Sequelize = require('sequelize');

const { CommentModel } = require('../db/models/comment.model');

const { AuthService } = require('../services/auth.service');

class CommentController {
    async createComment(req, res) {
        try {
            const commentPayload = req.body;
            const {
                id_employee,
                id_organization
            } = req.tokenPayload;

            await CommentModel.create({
                text: commentPayload.text,
                created_date: Sequelize.literal('CURRENT_TIMESTAMP'),
                id_idea: commentPayload.id_idea,
                id_employee: id_organization && !id_employee ? null : id_employee,
                id_organization
            })

            res.status(200).json({
                status: true,
                message: 'Комментарий создан'
            })
        } catch (err) {
            res.status(400).json({
                status: false,
                message: 'Не удалось создать комментарий'
            })
        }
    }

    async getComments(req, res) {
        const id_idea = req.query.id;

        const comments = await CommentModel.findAll({where: { id_idea: id_idea }})

        if (!comments.length) {
            res.status(200).json({
                status: true,
                comments: 0
            })
        }

        for (let i = 0; i < comments.length; i++) {
            const id_employee = comments[i].dataValues.id_employee;
            const id = id_employee ? id_employee : comments[i].dataValues.id_organization;
            let author = await AuthService.getUserById(id, id_employee ? 'employee' : 'organization')

            if (id_employee) {
                comments[i].dataValues.author = {
                    first_name: author.first_name,
                    last_name: author.last_name,
                    isLeader: author.isLeader,
                    reg_date: author.reg_date,
                    avatarHash: author.avatarHash,
                    isOrganization: false
                }
            } else {
                comments[i].dataValues.author = {
                    first_name: author.name,
                    last_name: null,
                    isLeader: false,
                    reg_date: author.created_date,
                    avatarHash: null,
                    isOrganization: true
                }
            }
        }

        res.status(200).json({
            status: true,
            comments
        })
    }
}

module.exports.CommentController = new CommentController();
