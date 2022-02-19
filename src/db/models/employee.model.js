const Sequelize = require('sequelize');
const db = require('../connect');

const EmployeeModel = db.define('employees', {
  id_employee: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_organization: {
    type: Sequelize.INTEGER,
  },
  login: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
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
  avatarHash: {
    type: Sequelize.STRING(150),
    allowNull: true
  },
  reg_date: {
    type: Sequelize.DATE,
  },
},
  {
    timestamps: false,
  }
);

module.exports.EmployeeModel = EmployeeModel;
