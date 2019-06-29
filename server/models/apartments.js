const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentsSchema = new Schema({
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
        default: 'Բնակարան'
    },
    additionalInfoFields: {
        type: [String],
        required: true
    },
    additionalInformation: {
        am: {type: String},
        ru: {type: String},
        en: {type: String},
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
        required: false
    },
    communities: {
        type: String
    },
    covers: {
        type: String,
        required: true
    },
    floor: {
        type: [String],
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
    projects: {
        type: String,
        required: false
    },
    regions: {
        type: String,
        required: true
    },
    streets: {
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
    cities: {
        type: String,
        required: true
    },
    numberOfRooms: {
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
