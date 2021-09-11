const Sequelize = require('sequelize');
const db = require('../connect');

module.exports.OrganizationModel = db.define('organizations', {
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
)
