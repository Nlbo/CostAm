const express = require('express');
const router = express.Router();
const controller = require('../controllers/newlyBuilds');
const uploadImg = require('../middleware/multer');

router.post('/filtered', controller.getData);
router.post('/',uploadImg.array('images'), controller.postData);
router.get ('/', controller.getMapMarkers);



module.exports = router;
