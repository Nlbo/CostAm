const Apartments = require('../models/apartments');


module.exports = {
    postData: async (req, res) => {
        let data = req.body;

        let images = [];

        req.files.forEach(item => {
            images.push(item.filename);
        })

        data.imgs = images;
        // data.floor = data.floor.indexOf(',') >= 0 ?data.floor.split(',') : [data.floor];
        data.floor && data.floor.indexOf(',') >= 0 ? data.floor = data.floor.split(',') : data.floor =  [data.floor];
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
        // console.log(req.body)

        let arr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];


        let filters = {
            pricesStart: req.body.pricesStart ? req.body.pricesStart : 0,
            pricesEnd: req.body.pricesEnd ? req.body.pricesEnd : 9999999999999999,
            currency: req.body.currency ? req.body.currency : ["USD", "AMD"],
            transactions: req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"],
        };


        let numer = [];


        if (req.body.numberOfRooms.length > 0) {
            req.body.numberOfRooms.forEach(items => {
                if (items === 4) {
                    numer = numer.concat(arr);
                } else {
                    numer.push(items);
                }
            });
        }



            req.body.newlyBuilds ? apartmetns.projects = 'Նորակառույց' : null;
            req.body.transactions.length > 0 ? apartmetns.transactions = {"$in": req.body.transactions} : null;
            req.body.regions.length > 0 ? apartmetns.regions = {"$in": req.body.regions} : null;
            req.body.streets.length > 0 ? apartmetns.streets = {"$in": req.body.streets} : null;
            req.body.communities.length > 0 ? apartmetns.communities = {"$in": req.body.communities} : null;
            req.body.cities.length > 0 ? apartmetns.cities = {"$in": req.body.cities} : null;
            req.body.numberOfRooms.length > 0 ? apartmetns.numberOfRooms = {"$in": numer} : null;
            req.body.buildingTypes.length > 0 ? apartmetns.buildingTypes = {"$in": req.body.buildingTypes} : null;
            req.body.currency || req.body.pricesStart || req.body.pricesEnd ? apartmetns.prices =
                {
                    $elemMatch: {
                        'currency': req.body.currency ? req.body.currency : ["USD", "AMD"],
                        'type': {"$in": req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"]}
                    }
                } : null;
            // "$gt": req.body.pricesStart ? req.body.pricesStart + "" : "0",
            //     "$lte": req.body.pricesEnd ? req.body.pricesEnd + "" : "99999999999999999999999"
            // apartmetns.prices = {$elemMatch: {'price': "2000"}};
            //  apartmetns.prices = {$elemMatch: {'currency' : "USD", 'type' : "Վարձակալություն", 'price' : {"$gt" : "0" , "$lte" : "1999"}}};


            req.body.areaValue ? filters.areaValue = {
                min: req.body.areaValue.min,
                max: req.body.areaValue.max
            } : null;
            // apartmetns.prices = {$elemMatch: {'currency' : "AMD"}};

            let data = await Apartments
                .find(apartmetns);
            res.status(201).json({
                data: data,
                filters: filters
            })
    },
        getMapMarkers: async (req, res) => {

            // let candidate = await Apartments.find({}).distinct('mapDetails');
            let candidate = await Apartments.find({});
            res.status(201).json(candidate)
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
