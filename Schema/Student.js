const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
    },
    schoolID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    driverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
    },
});

module.exports = mongoose.model("Student", studentSchema);
