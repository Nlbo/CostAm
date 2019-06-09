const Apartments = require('../models/apartments');


module.exports = {
    getData: async (req, res) => {
        let newlyBuilds = {};

        let filters = {
            pricesStart : req.body.pricesStart ? req.body.pricesStart : 0,
            pricesEnd : req.body.pricesEnd ? req.body.pricesEnd : 9999999999999999,
            currency: req.body.currency ? req.body.currency : ["USD", "AMD"],
            transactions:req.body.transactions && req.body.transactions.length > 0 ? req.body.transactions : ["Վաճառք", "Օրավարձով", "Վարձակալություն"],
        };

        req.body.regions.length > 0 ? newlyBuilds.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? newlyBuilds.streets = {"$in": req.body.streets} : null;
        req.body.communities.length > 0 ? newlyBuilds.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? newlyBuilds.cities = {"$in": req.body.cities} : null;
        newlyBuilds.projects = 'Նորակառույց';


        let data = await Apartments
            .find(newlyBuilds);
        res.status(201).json({
            data: data,
            filters: filters
        })
    }
};
