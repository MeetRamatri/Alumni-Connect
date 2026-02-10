import express from "express";
import Opportunity from "../models/Opportunity.model.js";

const router = express.Router();

import { protectRoute } from "../middleware/auth.middleware.js";

// Create a new opportunity (Protected, Alumni only logic can be added here or in controller)
router.post("/", protectRoute, async (req, res) => {
    try {
        // Optional: Check if user is alumni
        // if (req.user.role !== 'alumni') return res.status(403).json({ message: "Only alumni can post opportunities" });

        const newOpportunity = new Opportunity({
            ...req.body,
            postedBy: req.user._id
        });
        const savedOpportunity = await newOpportunity.save();
        res.status(201).json(savedOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all opportunities
router.get("/", async (req, res) => {
    try {
        const opportunities = await Opportunity.find().populate("postedBy", "fullName profilePic batch");
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific opportunity by ID
router.get("/:id", async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.json(opportunity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an opportunity
router.put("/:id", async (req, res) => {
    try {
        const updatedOpportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOpportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.json(updatedOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an opportunity
router.delete("/:id", async (req, res) => {
    try {
        const deletedOpportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!deletedOpportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.json({ message: "Opportunity deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
