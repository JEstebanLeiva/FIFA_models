const createRelationBtn = document.getElementById("createRelationBtn");
const getAllRelationsBtn = document.getElementById("getAllRelationsBtn");
const deleteRelationBtn = document.getElementById("deleteRelationBtn");

// CREATE RELATION
createRelationBtn.addEventListener("click", async function () {
    const data = {
        appointment_id: Number(document.getElementById("rel_appointment_id").value),
        service_id: Number(document.getElementById("rel_service_id").value)
    };

    try {
        const response = await fetch("/appointment-service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("createRelationResult").innerText = JSON.stringify(result);
    } catch (error) {
        console.error(error);
        document.getElementById("createRelationResult").innerText = "Error creating relation";
    }
});

// GET ALL RELATIONS
getAllRelationsBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("/appointment-service");
        const data = await response.json();

        const list = document.getElementById("getAllRelationsResult");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<li>No relations found</li>";
            return;
        }

        data.forEach(rel => {
            const li = document.createElement("li");
            li.textContent = `Appointment ID: ${rel.appointment_id} | Service ID: ${rel.service_id}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getAllRelationsResult").innerHTML = "<li>Error getting relations</li>";
    }
});

// DELETE RELATION
deleteRelationBtn.addEventListener("click", async function () {
    const data = {
        appointment_id: Number(document.getElementById("delete_rel_appointment_id").value),
        service_id: Number(document.getElementById("delete_rel_service_id").value)
    };

    try {
        const response = await fetch("/appointment-service", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("deleteRelationResult").innerText = JSON.stringify(result);
    } catch (error) {
        console.error(error);
        document.getElementById("deleteRelationResult").innerText = "Error deleting relation";
    }
});