const Sequelize = require('sequelize');

const db = require('../connect');

const IdeaModel = db.define('ideas', {
    id_idea: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_organization: {
        type: Sequelize.INTEGER
    },
    id_employee: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING(50),
        allownull: false,
    },
    message_text: {
        type: Sequelize.TEXT,
        allownull: false
    },
    created: {
        type: Sequelize.DATE
    }
},
    {
        timestamps: false
    }
);

module.exports.IdeaModel = IdeaModel;