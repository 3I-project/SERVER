const router = require('express').Router();

const { OrganizationController } = require('../Controllers/organization.controller');

router.get('/all-organizations', OrganizationController.getAllorganization);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/org`, router);
}