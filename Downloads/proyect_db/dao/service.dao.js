const pool = require("../services/mysql.service");

// CREATE
async function createService(service) {
    const sql = `
        INSERT INTO service (name, description, price)
        VALUES (?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        service.name,
        service.description,
        service.price
    ]);
    return result;
}

// GET ALL
async function getServices() {
    const [rows] = await pool.execute("SELECT * FROM service");
    return rows;
}

// GET BY ID
async function getServiceById(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM service WHERE service_id = ?",
        [id]
    );
    return rows;
}

// UPDATE
async function updateService(id, service) {
    const sql = `
        UPDATE service
        SET name = ?, description = ?, price = ?
        WHERE service_id = ?
    `;
    const [result] = await pool.execute(sql, [
        service.name,
        service.description,
        service.price,
        id
    ]);
    return result;
}

// DELETE
async function deleteService(id) {
    const [result] = await pool.execute(
        "DELETE FROM service WHERE service_id = ?",
        [id]
    );
    return result;
}

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
};