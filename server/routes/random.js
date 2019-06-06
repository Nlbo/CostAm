const express = require('express');
const router = express.Router();
const Apartments = require('../models/apartments');
const Houses = require('../models/houses');
const controller = require('../controllers/lands');
const uploadImg = require('../middleware/multer');

router.get('/', async (req,res) => {
    let data1 = await Apartments.find({});
    let data2 = await Houses.find({});
    let data = data1.concat(data2);
    res.status(201).json(data);
});



module.exports = router;
