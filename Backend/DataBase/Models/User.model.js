const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    batch: Number,
    cur_role: String,
    company: String,
    location: String,
    pic: String,
    sendMessage: Array,
    receivedMessage: Array

})

module.exports = mongoose.model("User", userSchema);