const Apartments = require('../models/apartments');


module.exports = {
    postData: async (req,res) => {

        res.status(201).json({
            body: req.body,
            imgs: req.files
        })
        // let data = req.body;
        //
        // let images = [];
        //
        // req.files.forEach(item => {
        //     images.push(item.filename);
        // })
        //
        // data.imgs = JSON.stringify(images);
        //
        // try {
        //     await new Apartments(data).save();
        //     res.status(201).json(data);
        // } catch(e) {
        //     res.status(409).json({
        //         msg: 'Error: Apartment not saved ...'
        //     })
        // }
    },
    getData: (req,res) => {
        res.end();
    }
}
