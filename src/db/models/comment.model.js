const Sequelize = require('sequelize');
const db = require('../connect');

const CommentModel = db.define('comments', {
    id_comment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    created_date: {
        type: Sequelize.DATE
    },
    id_idea: {
        type: Sequelize.INTEGER,
    },
    id_employee: {
        type: Sequelize.INTEGER,
    }
}, 
    {
        timestamps: false
    }
);

module.exports.CommentModel = CommentModel;