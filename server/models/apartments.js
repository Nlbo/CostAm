const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentsSchema = new Schema({
    additionalInfoFields: {
        type: String,
        required: true
    },
    additionalInformation: {
        type: String,
        required: true
    },
    areaValue: {
        type: String,
        required: true
    },
    buildingTypes: {
        type: String,
        required: true
       },
    ceilingValue: {
        type: String,
        required: true
    },
    communities: {
        type: String,
        required: true
    },
    covers: {
        type: String,
        required: true
    },
    currencyForSale: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    flooring: {
        type: String,
        required: true
    },
    interiorDecorations: {
        type: String,
        required: true
    },
    mapDetails: {
        type: [
           'Mixed'
        ],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    priceForSale: {
        type: String,
        required: true
    },
    projects: {
        type: String,
        required: true
    },
    regions: {
        type: String,
        required: true
    },
    streets: {
        type: String,
        required: true
    },
    transactions: {
        type: String,
        required: true
    },
    imgs: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date(),
    },
    updated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('apartments', apartmentsSchema);