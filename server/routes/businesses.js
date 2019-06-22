const express = require('express');
const router = express.Router();
const controller = require('../controllers/businesses');
const uploadImg = require('../middleware/multer');

router.post('/', uploadImg.array('images'), controller.postData);
router.post('/filtered', controller.getData);
router.get ('/', controller.getMapMarkers);



module.exports = router;
