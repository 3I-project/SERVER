const router = require('express').Router();
const multer = require("multer");
const path = require('path');

const { storageConfig } = require('../config/diskStorage');

const upload = multer({ storage: storageConfig })

router.post('/avatar', upload.single('avatar'), (req, res) => {
    res.status(200).json({
        status: true,
        avatarUrl: req.file.filename
    })
})

module.exports.init = (app, apiVersoin) => {
    app.use(`${apiVersoin}/files`, router);
};

