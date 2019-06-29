const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LandsSchema = new Schema({
    top: {
        type: Boolean,
        default: false
    },
    codeValue: {
        type: String,
        required: true
    },
    announcementType: {
        type: String,
        default: 'Հողամաս'
    },
    actualUse: {
        type: [String],
        required: true
    },
    additionalInfoFields: {
        type: [String],
        required: false
    },
    additionalInformation: {
        am: {type: String},
        ru: {type: String},
        en: {type: String},
    },
    buildingArea: {
        type: String,
        required: false
    },
    cities: {
        type: String,
        required: true
    },
    communities: {
        type: String
    },
    front: {
        type: String,
        required: false
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
    supportingArea: {
        type: String,
        required: false
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

module.exports = mongoose.model('lands', LandsSchema);
