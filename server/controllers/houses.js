const Houses = require('../models/houses');


module.exports = {
    postData: async (req, res) => {

        let data = req.body;

        let images = [];

        req.files.forEach(item => {
            images.push(item.filename);
        });

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
            await new Houses(data).save();
            res.status(201).json(data);
        } catch (e) {
            res.status(409).json({
                msg: 'Error: House not saved ...'
            })
        }
    },
    getData: async (req, res) => {

        let houses = {};
        //
        req.body.transactions.length > 0 ? houses.transactions = {"$in": req.body.transactions} : null;
        req.body.regions.length > 0 ? houses.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? houses.streets = {"$in": req.body.streets} : null;
        req.body.communities.length > 0 ? houses.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? houses.cities = {"$in": req.body.cities} : null;
        req.body.buildingTypes.length > 0 ? houses.buildingTypes = {"$in": req.body.buildingTypes} : null;
        req.body.numberOfRooms.length > 0 ? houses.numberOfRooms = {"$in": req.body.numberOfRooms} : null;
        req.body.flooring ? houses.flooring = "" + req.body.flooring : null;
        req.body.floor ? houses.floor = "" + req.body.floor : null;
        req.body.currency || req.body.pricesStart || req.body.pricesEnd ? houses.prices =
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


        req.body.landArea ? houses.landArea = {
            "$gte": "" + req.body.landArea.min,
            "$lte": "" + req.body.landArea.max
        } : null;

        req.body.livingSpace ? houses.livingSpace = {
            "$gte": "" + req.body.livingSpace.min,
            "$lte": "" + req.body.livingSpace.max
        } : null;

// apartmetns.prices = {$elemMatch: {'currency' : "AMD"}};
        console.log(houses);
        console.log(req.body);
        let data = await Houses
            .find(houses);
        res.status(201).json(data)
    },
    getMapMarkers: async (req,res) => {
        let candidate = await Houses.find({}).distinct('mapDetails');
        res.status(201).json(candidate)
    }
};

