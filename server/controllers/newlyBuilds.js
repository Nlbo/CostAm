const NewlyBuilds = require('../models/newlybuilds');


module.exports = {
    getData: async (req, res) => {
        let newlyBuilds = {};

        let filters = {
            pricesStart : req.body.pricesStart ? req.body.pricesStart : 0,
            pricesEnd : req.body.pricesEnd ? req.body.pricesEnd : 9999999999999999,
            currency: req.body.currency ? req.body.currency : ["USD", "AMD"],
            transactions:req.body.transactions && req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"],
        };

        req.body.transactions.length > 0 ? newlyBuilds.transactions = {"$in": req.body.transactions} : ["Վաճառք", "Օրավարձով", "Վարձակալություն"];
        req.body.regions.length > 0 ? newlyBuilds.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? newlyBuilds.streets = {"$in": req.body.streets} : null;
        req.body.communities.length > 0 ? newlyBuilds.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? newlyBuilds.cities = {"$in": req.body.cities} : null;


        let data = await NewlyBuilds
            .find(newlyBuilds);
        res.status(201).json({
            data: data,
            filters: filters
        })
    },
    postData: async (req,res) => {
        let data = req.body;

        let images = [];

        req.files.forEach(item => {
            images.push(item.filename);
        });

        data.imgs = images;

    data.additionalInfoFields && JSON.parse(data.additionalInfoFields) ? data.additionalInfoFields = JSON.parse(data.additionalInfoFields) : data.additionalInfoFields;
    data.mapDetails && JSON.parse(data.mapDetails) ? data.mapDetails = JSON.parse(data.mapDetails) : data.mapDetails;
    data.phone && JSON.parse(data.phone) ? data.phone = JSON.parse(data.phone) : data.phone;
    data.transactions && JSON.parse(data.transactions) ? data.transactions = JSON.parse(data.transactions) : data.transactions;



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
            await new NewlyBuilds(data).save();
            res.status(201).json(data);
        } catch (e) {
            console.log(e)
            res.status(409).json({
                msg: 'Error: Apartment not saved ...'
            })
        }
    },

    getMapMarkers: async (req,res) => {
        // let candidate = await Houses.find({}).distinct('mapDetails');
        let candidate = await NewlyBuilds.find({});
        res.status(201).json(candidate)
    }

};
