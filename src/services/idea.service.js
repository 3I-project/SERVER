const Sequelize = require('sequelize');

const { IdeaModel } = require('../db/models/idea.model');
const { IdeaTypeModel } = require('../db/models/ideaType.model');
const {AuthService} = require("../services/auth.service");
const {CommentService} = require("../services/comment.service");
const { IdeaReactionsService } = require("../services/ideaReactions.service");

class IdeaService {
    async createIdea(payload, user) {
        return await IdeaModel.create({
            id_organization: user.id_organization,
            id_employee: user?.id_employee,
            title: payload.title,
            message_text: payload.content,
            type_id: payload.type_id,
            enableComments: payload.enableComments,
            created: Sequelize.literal('CURRENT_TIMESTAMP')
        })
    }

    async updateIdea(payload, user) {
        console.log(payload)
        return await IdeaModel.update({
            title: payload.title,
            message_text: payload.content,
            enableComments: payload.enableComments
        }, {
            where: { id_idea: payload.id_idea }
        })
    }

    async getPostsByUserId (id_employee) {
        const ideasData = await IdeaModel.findAll({ where: {id_employee: id_employee} })

        return await this._parseIdeas(ideasData);
    }

    async getPostsByOrganization (id_organization) {
        const ideasData = await IdeaModel.findAll({ where: {id_organization: id_organization} })

        return await this._parseIdeas(ideasData);
    }

    async getPostByIdeaId (id_idea) {
        const idea = await IdeaModel.findOne({ where: {id_idea: id_idea}})

        return await this._parseIdeas([idea]);
    }

    async filterBySubString (id_organization, subString) {
        const filterItems = await IdeaModel.findAll(
            {where:
                Sequelize.and(
                    Sequelize.or(
                        { title: { [Sequelize.Op.iLike]: `%${subString}%` } },
                        { message_text: { [Sequelize.Op.iLike]: `%${subString}%` } }
                    ),
                    {id_organization}
                )
            }
        )
        return await this._parseIdeas(filterItems);
    }

    async getTypesList() {
        return IdeaTypeModel.findAll();
    }

    async _parseIdeas(ideas) {
        for (let i = 0; i < ideas.length; i++) {
            const id_employee = ideas[i].dataValues.id_employee;
            let { first_name, last_name, isLeader, reg_date, avatarHash } = await AuthService.getUserById(id_employee, 'employee')
            let comments = await CommentService.getCommentsByIdeaId(ideas[i].dataValues.id_idea);
            const { likes, dislikes } = await IdeaReactionsService.getIdeaReactions(ideas[i].dataValues.id_idea);
            let ideaType = await this._getIdeaType(ideas[i].dataValues.type_id)

            ideas[i].dataValues.author = {
                first_name,
                last_name,
                isLeader,
                avatarHash,
                reg_date
            }

            ideas[i].dataValues.commentsCount = comments.length;
            ideas[i].dataValues.type = ideaType.type;
            ideas[i].dataValues.reactions = {
                likes: likes.length,
                dislikes: dislikes.length
            }
        }
        return ideas;
    }

    async _getIdeaType(type_id) {
        const ideaType = await IdeaTypeModel.findOne({ where: { type_id }});

        return ideaType;
    }
}

module.exports.IdeaService = new IdeaService();
