import express from "express";
import Clubs from "../models/Clubs.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all clubs
router.get("/", async (req, res) => {
    try {
        const clubs = await Clubs.find();
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific club by ID
router.get("/:id", async (req, res) => {
    try {
        const club = await Clubs.findById(req.params.id);
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.json(club);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new club (Protected: Admin only)
router.post("/", protectRoute, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const club = new Clubs(req.body);
        const savedClub = await club.save();
        res.status(201).json(savedClub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing club (Protected: Admin only)
router.put("/:id", protectRoute, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const updatedClub = await Clubs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedClub) {
            return res.status(404).json({ message: "Club not found" });
        }

        res.json(updatedClub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a club (Protected: Admin only)
router.delete("/:id", protectRoute, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const deletedClub = await Clubs.findByIdAndDelete(req.params.id);

        if (!deletedClub) {
            return res.status(404).json({ message: "Club not found" });
        }

        res.json({ message: "Club deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
