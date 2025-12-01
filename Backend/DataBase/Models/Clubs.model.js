const mongoose = require("mongoose");

const ClubsSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Type: String,
    Number_of_Members: Number
})

module.exports = mongoose.model("Clubs", ClubsSchema);