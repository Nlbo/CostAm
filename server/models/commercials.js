const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommercialsSchema = new Schema({
    announcementType: {
        type: String,
        default: 'Կոմերցիոն'
    },
    actualUse: {
        type: [String],
        required: true
    },
    additionalInfoFields: {
        type: [String],
        required: true
    },
    additionalInformation: {
        type: String,
        required: true
    },
    buildingArea: {
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
    cities: {
        type: String,
        required: true
    },
    communities: {
        type: String
    },
    covers: {
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
    front: {
        type: String,
        required: true
    },
    interiorDecorations: {
        type: String,
        required: true
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

module.exports = mongoose.model('commercials', CommercialsSchema);
