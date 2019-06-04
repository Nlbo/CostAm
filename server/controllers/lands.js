const Lands = require('../models/lands');


module.exports = {
    postData: async (req, res) => {

        let data = req.body;

        let images = [];

        req.files.forEach(item => {
            images.push(item.filename);
        });

        data.imgs = images;
        data.actualUse = JSON.parse(data.actualUse);
        data.additionalInfoFields = JSON.parse(data.additionalInfoFields);
        data.mapDetails = JSON.parse(data.mapDetails);
        data.phone = JSON.parse(data.phone);
        data.transactions = JSON.parse(data.transactions);
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
        try {
            await new Lands(data).save();
            res.status(201).json(data);
        } catch (e) {
            res.status(409).json({
                msg: 'Error: Lands not saved ...'
            })
        }
    },
    getData: async (req, res) => {
        let lands = {};

        req.body.transactions.length > 0 ? lands.transactions = {"$in": req.body.transactions} : null;
        req.body.regions.length > 0 ? lands.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? lands.streets = {"$in": req.body.streets} : null;
        req.body.actualUse.length > 0 ? lands.actualUse = {"$in": req.body.actualUse} : null;
        req.body.communities.length > 0 ? lands.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? lands.cities = {"$in": req.body.cities} : null;
        req.body.currency || req.body.pricesStart || req.body.pricesEnd ? lands.prices =
            {$elemMatch: {
                    'currency': req.body.currency ? req.body.currency : "USD",
                    'type': {"$in":  req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Վարձակալություն"]},
                    'price': {
                        "$gte": req.body.pricesStart ? req.body.pricesStart + "" : "0",
                        "$lte": req.body.pricesEnd ? req.body.pricesEnd + "" : "99999999999999999999999"
                    }}
            } : null;
        // apartmetns.prices = {$elemMatch: {'price': "2000"}};
        //  apartmetns.prices = {$elemMatch: {'currency' : "USD", 'type' : "Վարձակալություն", 'price' : {"$gt" : "0" , "$lte" : "1999"}}};

        req.body.landArea ? lands.landArea = {
            "$gte": "" + req.body.landArea.min,
            "$lte": "" + req.body.landArea.max
        } : null;
        // apartmetns.prices = {$elemMatch: {'currency' : "AMD"}};

        let data = await Lands
            .find(lands);
        res.status(201).json(data)
    },
    getMapMarkers: async (req,res) => {
        let candidate = await Lands.find({}).distinct('mapDetails');
        res.status(201).json(candidate)
    }
}
