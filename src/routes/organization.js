const router = require('express').Router();

const { OrganizationController } = require('../Controllers/organization.controller');

router.get('/all', OrganizationController.getAllorganization);
router.get('/search', OrganizationController.getOrganizationBySearch);

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/organization`, router);
}