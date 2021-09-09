const Sequelize = require('sequelize');
const { EmployeeModel } = require('../db/models/employee.model');

class AuthService {
  async registrationEmployee(data) {
    const user = await EmployeeModel.findOne({ where: { first_name: data.first_name }});

    if (user) {
      throw new Error('Пользователь уже существует!');
    }

    await EmployeeModel.create({
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      isLeader: data?.isLeader,
      reg_date: Sequelize.literal('CURRENT_TIMESTAMP')
    })
  }
  
  registrationOrganization(data) {
    console.log(data, 'организация успешно зарегистрирована')
  }
}

module.exports.AuthService = new AuthService();