const express = require('express');
const router = express.Router();
const controller = require('../controllers/newlyBuilds');
const uploadImg = require('../middleware/multer');

router.post('/filtered', controller.getData);



module.exports = router;
