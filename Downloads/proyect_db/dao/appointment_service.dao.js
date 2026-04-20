const pool = require("../services/mysql.service");

// CREATE RELATION
async function createAppointmentService(data) {
    const sql = `
        INSERT INTO appointment_service (appointment_id, service_id)
        VALUES (?, ?)
    `;
    const [result] = await pool.execute(sql, [
        data.appointment_id,
        data.service_id
    ]);
    return result;
}

// GET ALL RELATIONS
async function getAppointmentServices() {
    const [rows] = await pool.execute(`
        SELECT *
        FROM appointment_service
    `);
    return rows;
}

// DELETE RELATION
async function deleteAppointmentService(appointment_id, service_id) {
    const [result] = await pool.execute(
        `
        DELETE FROM appointment_service
        WHERE appointment_id = ? AND service_id = ?
        `,
        [appointment_id, service_id]
    );
    return result;
}

module.exports = {
    createAppointmentService,
    getAppointmentServices,
    deleteAppointmentService
};