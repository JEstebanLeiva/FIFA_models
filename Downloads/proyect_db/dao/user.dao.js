const pool = require("../services/mysql.service");

// CREATE
async function createUser(user) {
    const sql = `
        INSERT INTO user (full_name, email, phone, address)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        user.full_name,
        user.email,
        user.phone,
        user.address
    ]);
    return result;
}

// GET ALL
async function getUsers() {
    const [rows] = await pool.execute("SELECT * FROM user");
    return rows;
}

// GET BY ID
async function getUserById(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM user WHERE user_id = ?",
        [id]
    );
    return rows;
}

// UPDATE
async function updateUser(id, user) {
    const sql = `
        UPDATE user
        SET full_name = ?, email = ?, phone = ?, address = ?
        WHERE user_id = ?
    `;
    const [result] = await pool.execute(sql, [
        user.full_name,
        user.email,
        user.phone,
        user.address,
        id
    ]);
    return result;
}

// DELETE
async function deleteUser(id) {
    const [result] = await pool.execute(
        "DELETE FROM user WHERE user_id = ?",
        [id]
    );
    return result;
}
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};