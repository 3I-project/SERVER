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
      throw new Error('Не удалось создать организацию');
    }
  }

  async checkUser(login, password, type) {
    if (!login || !password || !type) {
      throw new Error('Bad request')
    }

    const user = await this.getUserByLogin(login, type);

    const validPassword = user?.password === password;

    if(!user || !validPassword) return

    return user;
  }

  async getUserByLogin (login, type) {
    const currentModel = type === 'employee' ? EmployeeModel : OrganizationModel;

    return await currentModel.findOne({where: {login: login}});
  }

  async getUserById (id, type) {
    const currentModel = type === 'employee' ? EmployeeModel : OrganizationModel;

    if (type === 'employee') {
      return await currentModel.findOne({where: { id_employee: id }});
    } else {
      return await currentModel.findOne({where: { id_organization: id }});
    }
  }
}

module.exports.AuthService = new AuthService();
