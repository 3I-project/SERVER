const Sequelize = require('sequelize');

const db = require('../connect');

const IdeaTypeModel = db.define('ideasType', {
    type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING(100),
        allownull: false,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
)

module.exports.IdeaTypeModel = IdeaTypeModel;

