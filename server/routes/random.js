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

    console.log(req.body);

    let data1 = req.body.apartments === 0 ? [] : await Apartments.find({}).limit(req.body.apartments);
    let data2 = req.body.houses === 0 ? [] : await Houses.find({}).limit(req.body.houses);
    let data3 = req.body.commercials === 0 ? [] : await Commercials.find({}).limit(req.body.commercials);
    let data4 = req.body.lands === 0 ? [] : await Lands.find({}).limit(req.body.lands);
    let data5 = req.body.businesses === 0 ? [] : await Businesses.find({}).limit(req.body.businesses);
    let data = data1.concat(data2).concat(data3).concat(data4).concat(data5);
    console.log(data);
    res.status(201).json(data);
});



module.exports = router;
