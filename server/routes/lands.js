const express = require('express');
const router = express.Router();
const controller = require('../controllers/lands');
const uploadImg = require('../middleware/multer');

router.post('/', uploadImg.array('images'), controller.postData);
router.post('/filtered', controller.getData);



module.exports = router;
