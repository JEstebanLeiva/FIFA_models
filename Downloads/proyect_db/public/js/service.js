const createServiceBtn = document.getElementById("createServiceBtn");
const getAllServicesBtn = document.getElementById("getAllServicesBtn");
const getServiceByIdBtn = document.getElementById("getServiceByIdBtn");

// CREATE SERVICE
createServiceBtn.addEventListener("click", async function () {
    const data = {
        name: document.getElementById("service_name").value,
        description: document.getElementById("service_description").value,
        price: Number(document.getElementById("service_price").value)
    };

    try {
        const response = await fetch("/service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("createServiceResult").innerText = JSON.stringify(result);
    } catch (error) {
        console.error(error);
        document.getElementById("createServiceResult").innerText = "Error creating service";
    }
});

// GET ALL SERVICES
getAllServicesBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("/service");
        const data = await response.json();

        const list = document.getElementById("getAllServicesResult");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<li>No services found</li>";
            return;
        }

        data.forEach(service => {
            const li = document.createElement("li");
            li.textContent = `ID: ${service.service_id} | Name: ${service.name} | Description: ${service.description} | Price: ${service.price}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getAllServicesResult").innerHTML = "<li>Error getting services</li>";
    }
});

// GET SERVICE BY ID
getServiceByIdBtn.addEventListener("click", async function () {
    const id = document.getElementById("service_id").value;

    try {
        const response = await fetch(`/service/${id}`);
        const data = await response.json();

        const resultContainer = document.getElementById("getServiceByIdResult");
        resultContainer.innerHTML = "";

        if (!data || Object.keys(data).length === 0) {
            resultContainer.innerHTML = "<li>Service not found</li>";
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            resultContainer.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        document.getElementById("getServiceByIdResult").innerHTML = "<li>Error getting service</li>";
    }
});

// UPDATE SERVICE
document.getElementById("updateServiceBtn").addEventListener("click", async () => {
    const id = document.getElementById("update_service_id").value;

    const data = {
        name: document.getElementById("update_service_name").value,
        description: document.getElementById("update_service_description").value,
        price: Number(document.getElementById("update_service_price").value)
    };

    try {
        const res = await fetch(`/service/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        document.getElementById("updateServiceResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
        document.getElementById("updateServiceResult").innerText = "Error updating service";
    }
});

// DELETE SERVICE
document.getElementById("deleteServiceBtn").addEventListener("click", async () => {
    const id = document.getElementById("delete_service_id").value;

    try {
        const res = await fetch(`/service/${id}`, {
            method: "DELETE"
        });

        const result = await res.json();
        document.getElementById("deleteServiceResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
        document.getElementById("deleteServiceResult").innerText = "Error deleting service";
    }
});