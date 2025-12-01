const express = require("express");
const router = express.Router();
const Clubs = require("../DataBase/Models/Clubs.model");

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

module.exports = router;
