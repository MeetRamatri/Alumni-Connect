const express = require("express")
const router = express.Router()
const Clubs = require("../DataBase/Models/Clubs.model")

router.get("/", (req, res) => {
    res.send("Clubs!")
})

router.get("/clubs", async (req, res) => {
    try {
        const clubs = await Clubs.find()
        res.json(clubs)
    } catch (error) {
        console.error("Error fetching clubs:", error)
        res.status(500).json({ error: "Failed to fetch clubs" })
    }
})

router.post("/clubs", async (req, res) => {
    try {
        const { name, description, type, numberOfMembers } = req.body
        const club = new Clubs({ name, description, type, numberOfMembers })
        await club.save()
        res.json(club)
    } catch (error) {
        console.error("Error creating club:", error)
        res.status(500).json({ error: "Failed to create club" })
    }
})

router.patch("/clubs/:id", async (req, res) => {
    try {
        const { name, description, type, numberOfMembers } = req.body
        const club = await Clubs.findByIdAndUpdate(req.params.id, { name, description, type, numberOfMembers }, { new: true })
        res.json(club)
    } catch (error) {
        console.error("Error updating club:", error)
        res.status(500).json({ error: "Failed to update club" })
    }
})

router.delete("/clubs/:id", async (req, res) => {
    try {
        const club = await Clubs.findByIdAndDelete(req.params.id)
        res.json(club)
    } catch (error) {
        console.error("Error deleting club:", error)
        res.status(500).json({ error: "Failed to delete club" })
    }
})

module.exports = router
