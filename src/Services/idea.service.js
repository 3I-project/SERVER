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
}

module.exports.IdeaService = new IdeaService();
