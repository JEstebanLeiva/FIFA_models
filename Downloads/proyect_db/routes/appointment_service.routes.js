const express = require("express");
const router = express.Router();
const appointmentServiceDAO = require("../dao/appointment_service.dao");

// CREATE RELATION
router.post("/", async (req, res) => {
    try {
        const result = await appointmentServiceDAO.createAppointmentService(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating appointment-service relation" });
    }
});

// GET ALL RELATIONS
router.get("/", async (req, res) => {
    try {
        const rows = await appointmentServiceDAO.getAppointmentServices();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting appointment-service relations" });
    }
});

// DELETE RELATION
router.delete("/", async (req, res) => {
    try {
        const { appointment_id, service_id } = req.body;
        const result = await appointmentServiceDAO.deleteAppointmentService(
            appointment_id,
            service_id
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting appointment-service relation" });
    }
});

module.exports = router;