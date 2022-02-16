const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/avatars/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.slice(file.originalname.indexOf('.'), file.originalname.length - file.originalname.indexOf('.') + 1)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

module.exports.storageConfig = storage;
