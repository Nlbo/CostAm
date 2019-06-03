const Apartments = require('../models/apartments');


module.exports = {
    postData: async (req, res) => {
        let data = req.body;

        let images = [];

        req.files.forEach(item => {
            images.push(item.filename);
        })

        data.imgs = images;
        data.additionalInfoFields = JSON.parse(data.additionalInfoFields);
        data.mapDetails = JSON.parse(data.mapDetails);
        data.phone = JSON.parse(data.phone);
        data.transactions = JSON.parse(data.transactions);
        data.numberOfRooms = "" + data.numberOfRooms;
        data.prices = [];
        if (data.priceForRent) data.prices.push({
            type: 'Վարձակալություն',
            price: data.priceForRent + "",
            currency: data.currencyForRent
        });
        if (data.priceForSale) data.prices.push({
            type: 'Վաճառք',
            price: data.priceForSale + "",
            currency: data.currencyForSale
        });
        if (data.priceForDailyRent) data.prices.push({
            type: 'Օրավարձով',
            price: data.priceForDailyRent + "",
            currency: data.currencyForDailyRent,
        });

        try {
            await new Apartments(data).save();
            res.status(201).json(data);
        } catch (e) {
            console.log(e)
            res.status(409).json({
                msg: 'Error: Apartment not saved ...'
            })
        }
    },
    getData: async (req, res) => {
        let apartmetns = {};

        req.body.transactions.length > 0 ? apartmetns.transactions = {"$in": req.body.transactions} : null;
        req.body.regions.length > 0 ? apartmetns.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? apartmetns.streets = {"$in": req.body.streets} : null;
        req.body.communities.length > 0 ? apartmetns.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? apartmetns.cities = {"$in": req.body.cities} : null;
        req.body.buildingTypes.length > 0 ? apartmetns.buildingTypes = {"$in": req.body.buildingTypes} : null;
        req.body.numberOfRooms.length > 0 ? apartmetns.numberOfRooms = {"$in": req.body.numberOfRooms} : null;
        req.body.currency || req.body.pricesStart || req.body.pricesEnd ? apartmetns.prices =
            {$elemMatch: {
                    'currency': req.body.currency ? req.body.currency : "USD",
                    'type': {"$in":  req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"]},
                    'price': {
                        "$gte": req.body.pricesStart ? req.body.pricesStart + "" : "0",
                        "$lte": req.body.pricesEnd ? req.body.pricesEnd + "" : "99999999999999999999999"
                    }}
            } : null;
       // apartmetns.prices = {$elemMatch: {'price': "2000"}};
       //  apartmetns.prices = {$elemMatch: {'currency' : "USD", 'type' : "Վարձակալություն", 'price' : {"$gt" : "0" , "$lte" : "1999"}}};

        req.body.areaValue ? apartmetns.areaValue = {
            "$gte": "" + req.body.areaValue.min,
            "$lte": "" + req.body.areaValue.max
        } : null;
        // apartmetns.prices = {$elemMatch: {'currency' : "AMD"}};

        let data = await Apartments
            .find(apartmetns);
        res.status(201).json(data)
    }
};

// transactions: {$in: req.body.transactions},
// regions: {$in: req.body.regions},
// streets: {$in: req.body.streets},
// communities: {$in: req.body.communities},
// cities: {$in: req.body.cities},
// buildingTypes: {$in: req.body.buildingTypes},
// numberOfRooms: {$in: req.body.numberOfRooms},
// areaValue: {$in: req.body.areaValue},
