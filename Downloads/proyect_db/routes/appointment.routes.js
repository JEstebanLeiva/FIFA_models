const express = require("express");
const router = express.Router();
const appointmentDAO = require("../dao/appointment.dao");

// CREATE
router.post("/", async (req, res) => {
    try {
        const result = await appointmentDAO.createAppointment(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating appointment" });
    }
});

// GET ALL
router.get("/", async (req, res) => {
    try {
        const appointments = await appointmentDAO.getAppointments();
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting appointments" });
    }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const appointment = await appointmentDAO.getAppointmentById(req.params.id);
        res.json(appointment[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting appointment" });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const result = await appointmentDAO.updateAppointment(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating appointment" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const result = await appointmentDAO.deleteAppointment(req.params.id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting appointment" });
    }
});

module.exports = router;