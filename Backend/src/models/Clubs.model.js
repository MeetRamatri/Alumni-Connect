import mongoose from "mongoose";

const ClubsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
    },
    tag: {
        type: String,
        required: true,
    },
    icon: {
        type: String, // Store icon name (e.g., 'Code', 'Music')
        required: true,
    },
    color: {
        type: String, // Store tailwind classes e.g. 'bg-blue-100 text-blue-800'
    },
    president: {
        type: String,
    },
    vicePresident: {
        type: String,
    },
    memberCount: {
        type: String, // e.g., '80+ active members'
    },
    members: [String], // Array of member names
    achievements: [String],
}, { timestamps: true });

const Clubs = mongoose.model("Clubs", ClubsSchema);

export default Clubs;