const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessesSchema = new Schema({
    codeValue: {
        type: String,
        required: true
    },
    announcementType: {
        type: String,
        default: 'Բիզնես'
    },
    additionalInfoFields: {
        type: [String]
    },
    areasBusiness: {
        type: [String]
    },
    additionalInformation: {
        am: {type: String},
        ru: {type: String},
        en: {type: String},
    },
    annualNetProfit: {
        type: String
    },
    buildingArea: {
        type: String
    },
    cities: {
        type: String,
        required: true
    },
    communities: {
        type: String
    },
    landArea: {
        type: String
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
    floor: {
        type: [String]
    },
    flooring: {
        type: String
    },
    prices: [{
        type: {
            type: String,
        },
        price: {
            type: String,
            default: 'Պայմ'
        },
        currency: {
            type: String,
            default: 'Պայմ'
        }
    }],
    supportingArea: {
        type: String
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
