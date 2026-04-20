const express = require("express");
const app = express();

const userRoutes = require("./routes/user.routes");
const petRoutes = require("./routes/pet.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const serviceRoutes = require("./routes/service.routes");
const appointmentServiceRoutes = require("./routes/appointment_service.routes");

app.use(express.json());
app.use(express.static("public"));

app.use("/user", userRoutes);
app.use("/pet", petRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/service", serviceRoutes);
app.use("/appointment-service", appointmentServiceRoutes);

app.listen(5000, () => {
    console.log("Server running in http://localhost:5000");
});