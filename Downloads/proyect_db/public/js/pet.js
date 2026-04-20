const createPetBtn = document.getElementById("createPetBtn");
const getAllPetsBtn = document.getElementById("getAllPetsBtn");
const getPetByIdBtn = document.getElementById("getPetByIdBtn");

// CREATE PET
createPetBtn.addEventListener("click", async function () {
    const data = {
        name: document.getElementById("pet_name").value,
        species: document.getElementById("species").value,
        breed: document.getElementById("breed").value,
        age: Number(document.getElementById("age").value),
        user_id: Number(document.getElementById("pet_user_id").value)
    };

    try {
        const response = await fetch("/pet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("createPetResult").innerText = JSON.stringify(result);
    } catch (error) {
        console.error(error);
        document.getElementById("createPetResult").innerText = "Error creating pet";
    }
});

// GET ALL PETS
getAllPetsBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("/pet");
        const data = await response.json();

        const list = document.getElementById("getAllPetsResult");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<li>No pets found</li>";
            return;
        }

        data.forEach(pet => {
            const li = document.createElement("li");
            li.textContent = `ID: ${pet.pet_id} | Name: ${pet.name} | Species: ${pet.species} | Breed: ${pet.breed} | Age: ${pet.age} | User ID: ${pet.user_id}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getAllPetsResult").innerHTML = "<li>Error getting pets</li>";
    }
});

// GET PET BY ID
getPetByIdBtn.addEventListener("click", async function () {
    const id = document.getElementById("pet_id").value;

    try {
        const response = await fetch(`/pet/${id}`);
        const data = await response.json();

        const resultContainer = document.getElementById("getPetByIdResult");
        resultContainer.innerHTML = "";

        if (!data || Object.keys(data).length === 0) {
            resultContainer.innerHTML = "<li>Pet not found</li>";
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            resultContainer.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getPetByIdResult").innerHTML = "<li>Error getting pet</li>";
    }

    
});

// UPDATE PET
document.getElementById("updatePetBtn").addEventListener("click", async () => {
    const id = document.getElementById("update_pet_id").value;

    const data = {
        name: document.getElementById("update_pet_name").value,
        species: document.getElementById("update_species").value,
        breed: document.getElementById("update_breed").value,
        age: Number(document.getElementById("update_age").value),
        user_id: Number(document.getElementById("update_pet_user_id").value)
    };

    try {
        const res = await fetch(`/pet/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        document.getElementById("updatePetResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
        document.getElementById("updatePetResult").innerText = "Error updating pet";
    }
});

// DELETE PET
document.getElementById("deletePetBtn").addEventListener("click", async () => {
    const id = document.getElementById("delete_pet_id").value;

    try {
        const res = await fetch(`/pet/${id}`, {
            method: "DELETE"
        });

        const result = await res.json();
        document.getElementById("deletePetResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
        document.getElementById("deletePetResult").innerText = "Error deleting pet";
    }
});