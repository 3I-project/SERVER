const { OrganizationModel } = require('../db/models/organization.model');

const  Sequelize = require('sequelize')
const db = require('../db/connect');

class OrganizationController {
    async getAllorganization(req, res) {
        const organizationList = await OrganizationModel.findAll({attributes: ['id_organization', 'name', 'address', 'reg_date']});

        const payload =  {
            organization: organizationList,
            count: organizationList.length
        }

        res.status(200).json({
            status: true,
            payload
        })
    }

    async getOrganizationBySearch(req, res) {
        // console.log(req.query.org);
        const search = req.query.org;
        

        const organizationList = await OrganizationModel.findAll(
            { attributes: ['id_organization', 'name', 'address', 'reg_date'] ,where: Sequelize.or(
                    { name: { [Sequelize.Op.iLike]: `%${search}%` } },
                    { address: { [Sequelize.Op.iLike]: `%${search}%` } } 
                )
            });
        
        res.status(200).json({
            msg: organizationList
        })
    }
}

module.exports.OrganizationController = new OrganizationController();