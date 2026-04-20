CREATE DATABASE IF NOT EXISTS vetnova_db;
USE vetnova_db;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(150) NOT NULL
);

CREATE TABLE pet (
    pet_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(80) NOT NULL,
    age INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_pet_user
        FOREIGN KEY (user_id)
        REFERENCES user(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE appointment (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(30) NOT NULL,
    reason VARCHAR(150) NOT NULL,
    pet_id INT NOT NULL,
    CONSTRAINT fk_appointment_pet
        FOREIGN KEY (pet_id)
        REFERENCES pet(pet_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE service (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE appointment_service (
    appointment_id INT NOT NULL,
    service_id INT NOT NULL,
    PRIMARY KEY (appointment_id, service_id),
    CONSTRAINT fk_appointmentservice_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointment(appointment_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_appointmentservice_service
        FOREIGN KEY (service_id)
        REFERENCES service(service_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



SELECT 
    user.full_name,
    pet.name AS pet_name,
    appointment.appointment_date,
    appointment.status,
    service.name AS service_name
FROM user
JOIN pet 
    ON user.user_id = pet.user_id
JOIN appointment 
    ON pet.pet_id = appointment.pet_id
JOIN appointment_service 
    ON appointment.appointment_id = appointment_service.appointment_id
JOIN service 
    ON appointment_service.service_id = service.service_id;