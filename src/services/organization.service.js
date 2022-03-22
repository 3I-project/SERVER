const { OrganizationModel } = require('../db/models/organization.model');
const {EmployeeModel} = require("../db/models/employee.model");

class OrganizationService {
    async getOrganizationById(id_organization) {
        return await OrganizationModel.findOne({where: {id_organization}});
    }

    async getEmployees (id_organization) {
        const employees = await EmployeeModel.findAll({
            where: {id_organization}
        })

        return employees.map(e => {
            return {
                type: 'employee',
                id_employee: e.id_employee,
                id_organization: e.id_organization,
                first_name: e.first_name,
                last_name: e.last_name,
                email: e.email,
                isLeader: e.isLeader,
                avatarUrl: e.avatarHash,
                reg_date: e.reg_date,
            }
        })
    }
}

module.exports.OrganizationService = new OrganizationService();
