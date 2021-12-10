const Sequelize = require('sequelize');

const { IdeaModel } = require('../db/models/idea.model');

class IdeaService {
    async createIdea(payload, user) {
        const idea = await IdeaModel.create({
            id_organization: user.id_organization,
            id_employee: user?.id_employee,
            title: payload.title,
            message_text: payload.content,
            created: Sequelize.literal('CURRENT_TIMESTAMP')
        })

        return idea
    }

    async getPostsByUserId (id_employee) {
        const ideas = await IdeaModel.findAll({ where: {id_employee: id_employee} })

        return ideas;
    }

    async getPostsByOrganization (id_organization) {
        const ideas = await IdeaModel.findAll({ where: {id_organization: id_organization} })

        return ideas;
    }
}

module.exports.IdeaService = new IdeaService();
