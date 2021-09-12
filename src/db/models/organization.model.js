const Sequelize = require('sequelize');

const { EmployeeModel } = require('./employee.model');
const { IdeaModel } = require('./idea.model');

const db = require('../connect');

const OrganizationModel = db.define('organizations', {
    id_organization: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100),
        allownull: false,
    },
    address: {
        type: Sequelize.STRING(100),
        allownull: true,
    },
    login: {
        type: Sequelize.STRING(20),
        allownull: false
    },
    password: {
        type: Sequelize.STRING(15),
        allownull: false
    },
    reg_date: {
        type: Sequelize.DATE
    }
},
    {
        timestamps: false,
    }
);

OrganizationModel.hasMany(EmployeeModel, { 
    onDelete: "cascade", 
    foreignKey: 'id_organization'
});

OrganizationModel.hasMany(IdeaModel, {
    onDelete: "cascade", 
    foreignKey: 'id_organization'
});

module.exports.OrganizationModel = OrganizationModel;