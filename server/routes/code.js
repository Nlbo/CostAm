const express = require('express');
const router = express.Router();




const apartments = require('../models/apartments');
const lands = require('../models/lands');
const houses = require('../models/houses');
const newlybuilds = require('../models/newlybuilds');
const commercials = require('../models/commercials');
const businesses = require('../models/businesses');

router.get ('/', async (req,res) => {


    let filters = {
        pricesStart : req.body.pricesStart ? req.body.pricesStart : 0,
        pricesEnd : req.body.pricesEnd ? req.body.pricesEnd : 9999999999999999,
        currency: req.body.currency ? req.body.currency : ["USD", "AMD", "Պայմ"],
        transactions:req.body.transactions && req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"],
    };



    let data1 = await apartments.find({codeValue: req.query.code});
    let data2 = await lands.find({codeValue: req.query.code});
    let data3 = await houses.find({codeValue: req.query.code});
    let data4 = await newlybuilds.find({codeValue: req.query.code});
    let data5 = await commercials.find({codeValue: req.query.code});
    let data6 = await businesses.find({codeValue: req.query.code});

    let data = data1.concat(data2).concat(data3).concat(data4).concat(data5).concat(data6);

    console.log(data)
    console.log(req.query.code)


    res.status(201).json({
        data: data,
        filters: filters
    });

});



module.exports = router;
