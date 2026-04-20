const express = require("express");
const router = express.Router();
const serviceDAO = require("../dao/service.dao");

// CREATE
router.post("/", async (req, res) => {
    try {
        const result = await serviceDAO.createService(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating service" });
    }
});

// GET ALL
router.get("/", async (req, res) => {
    try {
        const services = await serviceDAO.getServices();
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting services" });
    }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const service = await serviceDAO.getServiceById(req.params.id);
        res.json(service[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting service" });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const result = await serviceDAO.updateService(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating service" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const result = await serviceDAO.deleteService(req.params.id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting service" });
    }
});

module.exports = router;