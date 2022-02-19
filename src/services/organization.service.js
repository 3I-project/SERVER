const { OrganizationModel } = require('../db/models/organization.model');

class OrganizationService {
    async getOrganizationById(id_organization) {
        const organization = await OrganizationModel.findOne({where: { id_organization }})

        return organization;
    }
}

module.exports.OrganizationService = new OrganizationService();