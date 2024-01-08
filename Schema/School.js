const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    school_name: {
        type: String,
        required: true,
    },
    school_display_picture: {
        type: String,
        required: true,
    },
    school_address: {
        type: {
            address: {
                type: String,
                required: true,
            },
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
        },

        required: true,
    },
});

module.exports = mongoose.model("School", schoolSchema);
