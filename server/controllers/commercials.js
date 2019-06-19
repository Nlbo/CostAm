const Commercials = require('../models/commercials');


module.exports = {
    postData: async (req, res) => {

        let data = req.body;

        let images = [];

        req.files.forEach(item => {
            images.push(item.filename);
        });

        data.imgs = images;
        // data.floor = data.floor.indexOf(',') >= 0 ?data.floor.split(',') : [data.floor];
        data.floor && data.floor.indexOf(',') >= 0 ? data.floor = data.floor.split(',') : data.floor =  [data.floor];
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
            await new Commercials(data).save();
            res.status(201).json(data);
        } catch (e) {
            console.log(e)
            res.status(409).json({
                msg: 'Error: Commercial not saved ...'
            })
        }
    },
    getData: async (req, res) => {
        let commercials = {};
        let filters = {
            pricesStart : req.body.pricesStart ? req.body.pricesStart : 0,
            pricesEnd : req.body.pricesEnd ? req.body.pricesEnd : 9999999999999999,
            currency: req.body.currency ? req.body.currency : ["USD", "AMD"],
            transactions: req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"],
        };

        req.body.transactions.length > 0 ? commercials.transactions = {"$in": req.body.transactions} : null;
        req.body.regions.length > 0 ? commercials.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? commercials.streets = {"$in": req.body.streets} : null;
        req.body.communities.length > 0 ? commercials.communities = {"$in": req.body.communities} : null;
        req.body.actualUse.length > 0 ? commercials.actualUse = {"$in": req.body.actualUse} : null;
        req.body.cities.length > 0 ? commercials.cities = {"$in": req.body.cities} : null;
        req.body.currency || req.body.pricesStart || req.body.pricesEnd ? commercials.prices =
            {$elemMatch: {
                    'currency': req.body.currency ? req.body.currency : ["USD", "AMD"],
                    'type': {"$in":  req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"]}}
            } : null;
        // apartmetns.prices = {$elemMatch: {'price': "2000"}};
        //  apartmetns.prices = {$elemMatch: {'currency' : "USD", 'type' : "Վարձակալություն", 'price' : {"$gt" : "0" , "$lte" : "1999"}}};


        req.body.buildingArea ? filters.buildingArea = {
            min: req.body.buildingArea.min,
            max: req.body.buildingArea.max
        } : null;

        req.body.landArea ? filters.landArea = {
            min: req.body.landArea.min,
            max: req.body.landArea.max
        } : null;


        // apartmetns.prices = {$elemMatch: {'currency' : "AMD"}};

        let data = await Commercials
            .find(commercials);
        res.status(201).json({
            data: data,
            filters: filters
        })
    },
    getMapMarkers: async (req,res) => {
        // let candidate = await Commercials.find({}).distinct('mapDetails');
        let candidate = await Commercials.find({});
        res.status(201).json(candidate)
    }
}
