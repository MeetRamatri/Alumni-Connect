import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: String,
    Date: Date,
    Time: String,
    Location: String,
    Organizer: String,
    CreatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Event = mongoose.model("Event", EventsSchema);

export default Event;