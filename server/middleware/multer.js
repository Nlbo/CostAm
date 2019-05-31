const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        console.log('####################');
        console.log(req.body);
        console.log('####################');

        if (!fs.existsSync(__dirname + '/../_uploads')) {
            fs.mkdirSync(__dirname + '/../_uploads');
        }

        if(req.originalUrl.split('/')[2] === 'apartments' && req.method === 'POST'){
            cb(null, __dirname + '/../_uploads')
        }

    },
    filename: function (req, file, cb) {
        if (req.method === 'POST') {
            cb(null, new Date().getTime().toString() + file.originalname)
        }
    }
});

var fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
    } else {
        cb(null, true); // false error depq
    }
};



const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

module.exports = upload;