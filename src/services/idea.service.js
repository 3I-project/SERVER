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

    async getPostByIdeaId (id_idea) {
        const idea = await IdeaModel.findOne({ where: {id_idea: id_idea}})

        return idea
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

        return filterItems;
    }
}

module.exports.IdeaService = new IdeaService();
