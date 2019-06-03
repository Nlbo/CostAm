const Apartments = require('../models/apartments');


module.exports = {
    getData: async (req, res) => {
        let newlyBuilds = {};

        req.body.regions.length > 0 ? newlyBuilds.regions = {"$in": req.body.regions} : null;
        req.body.streets.length > 0 ? newlyBuilds.streets = {"$in": req.body.streets} : null;
        req.body.communities.length > 0 ? newlyBuilds.communities = {"$in": req.body.communities} : null;
        req.body.cities.length > 0 ? newlyBuilds.cities = {"$in": req.body.cities} : null;
        newlyBuilds.projects = 'Նորակառույց';


        let data = await Apartments
            .find(newlyBuilds);
        res.status(201).json(data)
    }
};
