const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewlyBuildsSchema = new Schema({
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
        default: 'Նորակառույց'
    },
    additionalInfoFields: {
        type: [String]
    },
    ceilingValue: {
        type: String
    },
    communities: {
        type: String
    },
    flooring: {
        type: String
    },
    interiorDecorations: {
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
    created: {
        type: Date,
        default: new Date(),
    },
    updated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('newlybuilds', NewlyBuildsSchema);
