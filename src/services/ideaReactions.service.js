const { IdeaReactionsModel } = require('../db/models/ideareactions.model');

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
     * @return {boolean} - усешное добавление/обновление реакции
     * */
    async setReaction(id_employee, id_organization, payload) {
        return await IdeaReactionsModel.create({
            user_id: id_employee,
            idea_id: payload.idea_id,
            org_id: id_organization,
            type: payload.type
        })
    }
}

module.exports.IdeaReactionsService = new IdeaReactionsService();
