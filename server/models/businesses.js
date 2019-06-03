const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessesSchema = new Schema({
    additionalInfoFields: {
        type: [String],
        required: true
    },
    areasBusiness: {
        type: [String],
        required: true
    },
    additionalInformation: {
        type: String,
        required: true
    },
    annualNetProfit: {
        type: String,
        required: true
    },
    buildingArea: {
        type: String,
        required: true
    },
    cities: {
        type: String,
        required: true
    },
    communities: {
        type: String
    },
    landArea: {
        type: String,
        required: true
    },
    mapDetails: {
        lat:  {
            type: Number,
            required: true
        },
        lng:  {
            type: Number,
            required: true
        },
        address:  {
            type: String,
            required: true
        }
    },
    phone: {
        type: [String],
        required: true
    },
    regions: {
        type: String,
        required: true
    },
    streets: {
        type: String
    },
    prices: [{
        type: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    }],
    supportingArea: {
        type: String,
        required: true
    },
    transactions: {
        type: [String],
        required: true
    },
    imgs: {
        type: [String],
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

module.exports = mongoose.model('businesses', BusinessesSchema);
