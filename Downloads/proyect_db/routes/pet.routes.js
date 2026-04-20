const express = require("express");
const router = express.Router();
const petDAO = require("../dao/pet.dao");

// CREATE
router.post("/", async (req, res) => {
    try {
        const result = await petDAO.createPet(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating pet" });
    }
});

// GET ALL
router.get("/", async (req, res) => {
    try {
        const pets = await petDAO.getPets();
        res.json(pets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting pets" });
    }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const pet = await petDAO.getPetById(req.params.id);
        res.json(pet[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting pet" });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const result = await petDAO.updatePet(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating pet" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const result = await petDAO.deletePet(req.params.id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting pet" });
    }
});
module.exports = router;