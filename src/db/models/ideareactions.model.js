const Sequelize = require('sequelize');

const db = require('../connect');

const IdeaReactionsModel = db.define('ideareactions', {
    like_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allownull: false
    },
    idea_id: {
        type: Sequelize.INTEGER,
        allownull: false
    },
    org_id: {
        type: Sequelize.INTEGER,
        allownull: false
    },
    type: {
        type: Sequelize.SMALLINT,
        allownull: false
    },
},
    {
        timestamps: false,
        freezeTableName: true
    }
    )

module.exports.IdeaReactionsModel = IdeaReactionsModel;
