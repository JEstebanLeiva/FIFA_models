const express = require("express");
const router = express.Router();
const userDAO = require("../dao/user.dao");

// CREATE
router.post("/", async (req, res) => {
    try {
        const result = await userDAO.createUser(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating user" });
    }
});

// GET ALL
router.get("/", async (req, res) => {
    const users = await userDAO.getUsers();
    res.json(users);
});

// GET BY ID
router.get("/:id", async (req, res) => {
    const user = await userDAO.getUserById(req.params.id);
    res.json(user[0] || {});
});

// UPDATE
router.put("/:id", async (req, res) => {
    const result = await userDAO.updateUser(req.params.id, req.body);
    res.json(result);
});

// DELETE
router.delete("/:id", async (req, res) => {
    const result = await userDAO.deleteUser(req.params.id);
    res.json(result);
});

module.exports = router;