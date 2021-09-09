const sequelize = require('sequelize');

const EmployeeModel = sequelize.define('employees', {
  id_employee: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  isLeader: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  reg_date: {
    type: Sequelize.DATE
  }
});

module.exports.EmployeeModel = EmployeeModel;