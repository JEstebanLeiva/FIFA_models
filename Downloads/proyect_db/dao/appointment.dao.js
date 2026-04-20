const pool = require("../services/mysql.service");

// CREATE
async function createAppointment(appointment) {
    const sql = `
        INSERT INTO appointment (appointment_date, appointment_time, status, reason, pet_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        appointment.appointment_date,
        appointment.appointment_time,
        appointment.status,
        appointment.reason,
        appointment.pet_id
    ]);
    return result;
}

// GET ALL
async function getAppointments() {
    const [rows] = await pool.execute("SELECT * FROM appointment");
    return rows;
}

// GET BY ID
async function getAppointmentById(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM appointment WHERE appointment_id = ?",
        [id]
    );
    return rows;
}

// UPDATE
async function updateAppointment(id, appointment) {
    const sql = `
        UPDATE appointment
        SET appointment_date = ?, appointment_time = ?, status = ?, reason = ?, pet_id = ?
        WHERE appointment_id = ?
    `;
    const [result] = await pool.execute(sql, [
        appointment.appointment_date,
        appointment.appointment_time,
        appointment.status,
        appointment.reason,
        appointment.pet_id,
        id
    ]);
    return result;
}

// DELETE
async function deleteAppointment(id) {
    const [result] = await pool.execute(
        "DELETE FROM appointment WHERE appointment_id = ?",
        [id]
    );
    return result;
}

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};