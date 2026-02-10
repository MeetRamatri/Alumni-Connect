import mongoose from "mongoose";

const OpportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Internship", "Full-time", "Contract", "Part-time"],
        required: true
    },
    eligibility: {
        type: String,
    },
    skills: {
        type: [String],
        default: []
    },
    details: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Opportunity = mongoose.model("Opportunity", OpportunitySchema);

export default Opportunity;