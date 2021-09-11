const Sequelize = require('sequelize');
const { EmployeeModel } = require('../db/models/employee.model');
const { OrganizationModel } = require('../db/models/organization.model');

class AuthService {
  async registrationEmployee(data) {
    const user = await EmployeeModel.findOne({ where: { login: data.login }});

    if (user) {
      throw new Error('Пользователь уже существует!');
    }

    try {
      await EmployeeModel.create({
        id_organization: data.id_organization,
        login: data.login,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        isLeader: data?.isLeader,
        reg_date: Sequelize.literal('CURRENT_TIMESTAMP'),
      })
    } catch(err) {
      throw new Error('Не удалось создать пользователя!');
    }
  }
  
  async registrationOrganization(data) {
    const organization = await OrganizationModel.findOne({ where: { login: data.login }});
    if(organization) {
      throw new Error('Организация уже зарегистрирована');
    }

    try {
      await OrganizationModel.create({
        login: data.login,
        name: data.name,
        password: data.password,
        address: data.address,
        reg_date: Sequelize.literal('CURRENT_TIMESTAMP'),
      })
    } catch(err) {
      console.log(err)
      throw new Error('Не удалось создать организацию');
    }
  }
}

module.exports.AuthService = new AuthService();