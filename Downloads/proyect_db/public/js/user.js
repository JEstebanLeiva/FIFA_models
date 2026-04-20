const createUserBtn = document.getElementById("createUserBtn");
const fullNameInput = document.getElementById("full_name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const getAllUsersBtn = document.getElementById("getAllUsersBtn");

const userIdInput = document.getElementById("user_id");
const getUserByIdBtn = document.getElementById("getUserByIdBtn");

// CREATE USER
createUserBtn.addEventListener("click", async function () {
    const data = {
        full_name: fullNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value
    };

    try {
        const response = await fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("createUserResult").innerText = JSON.stringify(result);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("createUserResult").innerText = "Error creating user.";
    }
});

// GET ALL USERS
getAllUsersBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("/user");
        const data = await response.json();

        const list = document.getElementById("getAllUsersResult");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<li>No users found</li>";
            return;
        }

        data.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `ID: ${user.user_id} | Name: ${user.full_name} | Email: ${user.email} | Phone: ${user.phone} | Address: ${user.address}`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error getting users:", error);
        document.getElementById("getAllUsersResult").innerHTML = "<li>Error getting users</li>";
    }
});

// GET USER BY ID
getUserByIdBtn.addEventListener("click", async function () {
    const id = userIdInput.value;

    try {
        const response = await fetch(`/user/${id}`);
        const data = await response.json();

        const resultContainer = document.getElementById("getUserByIdResult");
        resultContainer.innerHTML = "";

        if (!data || Object.keys(data).length === 0) {
            resultContainer.innerHTML = "<li>User not found</li>";
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            resultContainer.appendChild(li);
        });

    } catch (error) {
        console.error("Error getting user:", error);
        document.getElementById("getUserByIdResult").innerHTML = "<li>Error getting user</li>";
    }
});

// UPDATE USER
document.getElementById("updateUserBtn").addEventListener("click", async () => {
    const id = document.getElementById("update_user_id").value;

    const data = {
        full_name: document.getElementById("update_full_name").value,
        email: document.getElementById("update_email").value,
        phone: document.getElementById("update_phone").value,
        address: document.getElementById("update_address").value
    };

    try {
        const res = await fetch(`/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        document.getElementById("updateUserResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
    }
});

// DELETE USER
document.getElementById("deleteUserBtn").addEventListener("click", async () => {
    const id = document.getElementById("delete_user_id").value;

    try {
        const res = await fetch(`/user/${id}`, {
            method: "DELETE"
        });

        const result = await res.json();
        document.getElementById("deleteUserResult").innerText = JSON.stringify(result);
    } catch (err) {
        console.error(err);
    }
});