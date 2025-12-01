const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
    company_name: String,
    role: String,
    location: String,
    description: String,
    type: String,
    salary: String
})

module.exports = mongoose.model("Opportunity", OpportunitySchema);