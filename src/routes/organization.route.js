const router = require('express').Router();

const { OrganizationController } = require('../controllers/organization.controller');
const AuthProtect= require('../middleware/authorizationProtection.middleware')

router.get('/all', OrganizationController.getAllorganization);
router.get('/search', OrganizationController.getOrganizationBySearch);
router.get('/employees', AuthProtect, OrganizationController.getEmployees)

module.exports.init = (app, apiVersion) => {
    app.use(`${apiVersion}/organization`, router);
}
