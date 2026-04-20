const createAppointmentBtn = document.getElementById("createAppointmentBtn");
const getAllAppointmentsBtn = document.getElementById("getAllAppointmentsBtn");
const getAppointmentByIdBtn = document.getElementById("getAppointmentByIdBtn");

// CREATE APPOINTMENT
createAppointmentBtn.addEventListener("click", async function () {
    const data = {
        appointment_date: document.getElementById("appointment_date").value,
        appointment_time: document.getElementById("appointment_time").value,
        status: document.getElementById("status").value,
        reason: document.getElementById("reason").value,
        pet_id: Number(document.getElementById("appointment_pet_id").value)
    };

    try {
        const response = await fetch("/appointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("createAppointmentResult").innerText = JSON.stringify(result);
    } catch (error) {
        console.error(error);
        document.getElementById("createAppointmentResult").innerText = "Error creating appointment";
    }
});

// GET ALL APPOINTMENTS
getAllAppointmentsBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("/appointment");
        const data = await response.json();

        const list = document.getElementById("getAllAppointmentsResult");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<li>No appointments found</li>";
            return;
        }

        data.forEach(appointment => {
            const li = document.createElement("li");
            li.textContent = `ID: ${appointment.appointment_id} | Date: ${appointment.appointment_date} | Time: ${appointment.appointment_time} | Status: ${appointment.status} | Reason: ${appointment.reason} | Pet ID: ${appointment.pet_id}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getAllAppointmentsResult").innerHTML = "<li>Error getting appointments</li>";
    }
});

// GET APPOINTMENT BY ID
getAppointmentByIdBtn.addEventListener("click", async function () {
    const id = document.getElementById("appointment_id").value;

    try {
        const response = await fetch(`/appointment/${id}`);
        const data = await response.json();

        const resultContainer = document.getElementById("getAppointmentByIdResult");
        resultContainer.innerHTML = "";

        if (!data || Object.keys(data).length === 0) {
            resultContainer.innerHTML = "<li>Appointment not found</li>";
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            resultContainer.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getAppointmentByIdResult").innerHTML = "<li>Error getting appointment</li>";
    }
});

// UPDATE APPOINTMENT
document.getElementById("updateAppointmentBtn").addEventListener("click", async () => {
    const id = document.getElementById("update_appointment_id").value;

    const data = {
        appointment_date: document.getElementById("update_appointment_date").value,
        appointment_time: document.getElementById("update_appointment_time").value,
        status: document.getElementById("update_status").value,
        reason: document.getElementById("update_reason").value,
        pet_id: Number(document.getElementById("update_appointment_pet_id").value)
    };

    try {
        const res = await fetch(`/appointment/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        document.getElementById("updateAppointmentResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
        document.getElementById("updateAppointmentResult").innerText = "Error updating appointment";
    }
});

// DELETE APPOINTMENT
document.getElementById("deleteAppointmentBtn").addEventListener("click", async () => {
    const id = document.getElementById("delete_appointment_id").value;

    try {
        const res = await fetch(`/appointment/${id}`, {
            method: "DELETE"
        });

        const result = await res.json();
        document.getElementById("deleteAppointmentResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
        document.getElementById("deleteAppointmentResult").innerText = "Error deleting appointment";
    }
});