// Imports

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma de données


const programSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    countries: {
        type: [String],
        default: [],
        required: true
    },
    schedule: {
        type: Date,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    }
});

// Export du modèle Program

module.exports = mongoose.model('Program', programSchema);