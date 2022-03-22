const { OrganizationModel } = require('../db/models/organization.model');
const {EmployeeModel} = require("../db/models/employee.model");

class OrganizationService {
    async getOrganizationById(id_organization) {
        const organization = await OrganizationModel.findOne({where: { id_organization }})

        return organization;
    }

    async getEmployees (id_organization) {
        const employees = await EmployeeModel.findAll({
            where: {id_organization}
        })

        return employees
    }
}

module.exports.OrganizationService = new OrganizationService();
