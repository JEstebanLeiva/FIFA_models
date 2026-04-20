const pool = require("../services/mysql.service");

// CREATE
async function createPet(pet) {
    const sql = `
        INSERT INTO pet (name, species, breed, age, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        pet.name,
        pet.species,
        pet.breed,
        pet.age,
        pet.user_id
    ]);
    return result;
}

// GET ALL
async function getPets() {
    const [rows] = await pool.execute("SELECT * FROM pet");
    return rows;
}

// GET BY ID
async function getPetById(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM pet WHERE pet_id = ?",
        [id]
    );
    return rows;
}

// UPDATE
async function updatePet(id, pet) {
    const sql = `
        UPDATE pet
        SET name = ?, species = ?, breed = ?, age = ?, user_id = ?
        WHERE pet_id = ?
    `;
    const [result] = await pool.execute(sql, [
        pet.name,
        pet.species,
        pet.breed,
        pet.age,
        pet.user_id,
        id
    ]);
    return result;
}

// DELETE
async function deletePet(id) {
    const [result] = await pool.execute(
        "DELETE FROM pet WHERE pet_id = ?",
        [id]
    );
    return result;
}

module.exports = {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet
};