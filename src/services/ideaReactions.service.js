const { IdeaReactionsModel } = require('../db/models/ideareactions.model');
const {Sequelize} = require("sequelize");

class IdeaReactionsService {
    /**
     * Добавление лайка или дизлайка к идеи
     * Type принимает следующие значение -1, 0, 1
     * -1 - дизлайк
     * 0 - нейтрально,
     * 1 - лайк
     *
     * @async
     * @param {number} id_employee - id сотрудника
     * @param {number} id_organization - id организации сотрудника
     * @param {Object} payload - обект, хранящий данные о типе и id идей
     * @param {number} payload.idea_id - id идей
     * @param {number} payload.type - тип реакции
     *
     * @return {Promise<Object>} - усешное добавление/обновление реакции
     * */
    async setReaction(id_employee, id_organization, payload) {
            const isSetReaction = await this.isUserSetReaction(id_employee, payload.idea_id);
            let update = false

            if (isSetReaction && payload.type === isSetReaction) {
                throw new Error('Вы уже поставили данную реакцию!')
            }

            if (isSetReaction &&  payload.type !== isSetReaction) {
                await IdeaReactionsModel.update({
                    type: payload.type
                }, {
                    where: Sequelize.and( {  idea_id: payload.idea_id }, { user_id: id_employee })
                })

                update = true;
            } else {
                await IdeaReactionsModel.create({
                    user_id: id_employee,
                    idea_id: payload.idea_id,
                    org_id: id_organization,
                    type: payload.type
                })

                update = false;
            }

            return {
                status: true,
                update
            }
    }

    /**
     * Проверка, что пользователь уже выставлял на идею реакцию
     *
     * @async
     * @return {Object}
    * */
    async isUserSetReaction(id_employee, idea_id) {
        const reaction = await IdeaReactionsModel.findOne({ where: Sequelize.and( { idea_id }, { user_id: id_employee }) });

        return reaction?.dataValues.type || null;
    }

    async getIdeaReactions(idea_id) {
        const likes = await IdeaReactionsModel.findAll({ where: Sequelize.and({ idea_id }, { type: 1 }) })
        const dislikes = await IdeaReactionsModel.findAll({ where: Sequelize.and({ idea_id }, { type: -1 }) })

        return {
            likes,
            dislikes
        }
    }
}

module.exports.IdeaReactionsService = new IdeaReactionsService();
