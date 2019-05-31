const express = require('express');
const router = express.Router();
const controller = require('../controllers/houses');
const uploadImg = require('../middleware/multer');

router.post('/', uploadImg.array('images'), controller.postData);
router.get('/', controller.getData);



module.exports = router;
