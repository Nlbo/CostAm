const express = require('express');
const router = express.Router();
const Apartments = require('../models/apartments');
const Houses = require('../models/houses');
const Commercials = require('../models/commercials');
const Lands = require('../models/lands');
const Businesses = require('../models/businesses');
const controller = require('../controllers/lands');
const uploadImg = require('../middleware/multer');

router.post('/', async (req,res) => {

    let data1 =  await Apartments.find({top: true});
    let data2 =  await Houses.find({top: true});
    let data3 =  await Commercials.find({top: true});
    let data4 =  await Lands.find({top: true});
    let data5 =  await Businesses.find({top: true});
    let data = data1.concat(data2).concat(data3).concat(data4).concat(data5);
    console.log(data);
    res.status(201).json(data);
});



module.exports = router;
