const router = require('express').Router();
const multer = require("multer");

const { storageConfig } = require('../config/diskStorage');

const upload = multer({ storage: storageConfig })

router.post('/avatar', upload.single('avatar'), (req, res) => {
    console.log(req.file, req.body)
})

module.exports.init = (app, apiVersoin) => {
    app.use(`${apiVersoin}/files`, router);
};

