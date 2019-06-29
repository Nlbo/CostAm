const Businesses = require('../models/businesses');


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
        data.areasBusiness ? data.areasBusiness = JSON.parse(data.areasBusiness) : null;
        data.additionalInformation = JSON.parse(data.additionalInformation);

data.additionalInfoFields && JSON.parse(data.additionalInfoFields) ? data.additionalInfoFields = JSON.parse(data.additionalInfoFields) : data.additionalInfoFields;
data.mapDetails && JSON.parse(data.mapDetails) ? data.mapDetails = JSON.parse(data.mapDetails) : data.mapDetails;
data.phone && JSON.parse(data.phone) ? data.phone = JSON.parse(data.phone) : data.phone;
data.transactions && JSON.parse(data.transactions) ? data.transactions = JSON.parse(data.transactions) : data.transactions;

        data.prices = [];
        if (data.transactions.indexOf('Վաճառք') >= 0) data.prices.push({
            type: 'Վաճառք',
            price:  data.priceForSale && data.priceForSale !== 'null' ? data.priceForSale + "" : "Պայմ",
            currency: data.currencyForSale && data.currencyForSale !== 'null' ? data.currencyForSale + "" : "Պայմ"
        });
        if (data.transactions.indexOf('Վարձակալություն') >= 0) data.prices.push({
            type: 'Վարձակալություն',
            price: data.priceForRent && data.priceForRent !== 'null' ? data.priceForRent + "" : "Պայմ",
            currency: data.currencyForRent && data.currencyForRent !== 'null'  ? data.currencyForRent + "" : "Պայմ"
        });
        if (data.transactions.indexOf('Օրավարձով') >= 0) data.prices.push({
            type: 'Օրավարձով',
            price: data.priceForDailyRent && data.priceForDailyRent !== 'null' ? data.priceForDailyRent + "" : "Պայմ",
            currency: data.currencyForDailyRent && data.currencyForDailyRent !== 'null' ? data.currencyForDailyRent + "" : "Պայմ"
        });
        try {
            await new Businesses(data).save();
            res.status(201).json(data);
        } catch (e) {
            console.log(e)
            res.status(409).json({
                msg: 'Error: Business not saved ...'
            })
        }
    },
    getData: async (req, res) => {
        let lands = {};

        let filters = {
            pricesStart : req.body.pricesStart ? req.body.pricesStart : 0,
            pricesEnd : req.body.pricesEnd ? req.body.pricesEnd : 9999999999999999,
            currency: req.body.currency ? req.body.currency : ["USD", "AMD", "Պայմ"],
            transactions: req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"],
        };

        req.body.transactions.length > 0 ? lands.transactions = {"$in": req.body.transactions} : null;
        req.body.regions.length > 0 ? lands.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? lands.streets = {"$in": req.body.streets} : null;
        req.body.areasBusiness.length > 0 ? lands.areasBusiness = {"$in": req.body.areasBusiness} : null;
        req.body.communities.length > 0 ? lands.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? lands.cities = {"$in": req.body.cities} : null;
        req.body.currency || req.body.pricesStart || req.body.pricesEnd ? lands.prices =
            {$elemMatch: {
                    'currency': req.body.currency ? req.body.currency : ["USD", "AMD", "Պայմ"],
                    'type': {"$in":  req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"]}}
            } : null;
        // apartmetns.prices = {$elemMatch: {'price': "2000"}};
        //  apartmetns.prices = {$elemMatch: {'currency' : "USD", 'type' : "Վարձակալություն", 'price' : {"$gt" : "0" , "$lte" : "1999"}}};

        // apartmetns.prices = {$elemMatch: {'currency' : "AMD"}};

        let data = await Businesses
            .find(lands);
        res.status(201).json({
            data: data,
            filters: filters
        })
    },
    getMapMarkers: async (req,res) => {
        // let candidate = await Businesses.find({}).distinct('mapDetails');
        let candidate = await Businesses.find({});
        res.status(201).json(candidate)
    }
};
