// file loader
const multer = require('multer');
const path = require('path');
const imagesPath = path.join(__dirname, '../images');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images');
    },
    filename(req, file, cb) {
        const newFileName = Date.now().toString() + '-';
        cb(null, newFileName + file.originalname);
    }
});
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    storage,
    fileFilter,
})