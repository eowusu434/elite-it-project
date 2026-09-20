-- ============================================================
-- ELITE IT CONSULTING & TECHNOLOGY SERVICES LLC
-- DATABASE SCHEMA
-- ============================================================

CREATE DATABASE IF NOT EXISTS elite_it_consulting_technology_services_llc;

USE elite_it_consulting_technology_services_llc;


-- ============================================================
-- CUSTOMERS
-- ============================================================

CREATE TABLE IF NOT EXISTS customers (

    customer_id INT AUTO_INCREMENT PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL,

    contact_name VARCHAR(150),

    email VARCHAR(150),

    phone VARCHAR(30),

    address VARCHAR(255),

    city VARCHAR(100),

    state VARCHAR(100),

    zip_code VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- ============================================================
-- SUPPORT TICKETS
-- ============================================================

CREATE TABLE IF NOT EXISTS support_tickets (

    ticket_id INT AUTO_INCREMENT PRIMARY KEY,

    ticket_number VARCHAR(30) NOT NULL UNIQUE,

    customer_id INT,

    company_name VARCHAR(150) NOT NULL,

    issue_type VARCHAR(100) NOT NULL,

    details TEXT NOT NULL,

    status VARCHAR(50) DEFAULT 'Received',

    priority VARCHAR(50) DEFAULT 'Normal',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_ticket_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

);


-- ============================================================
-- CUSTOMER REVIEWS
-- ============================================================

CREATE TABLE IF NOT EXISTS reviews (

    review_id INT AUTO_INCREMENT PRIMARY KEY,

    customer_name VARCHAR(150) NOT NULL,

    rating INT NOT NULL,

    feedback TEXT NOT NULL,

    status VARCHAR(50) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_review_rating
        CHECK (rating BETWEEN 1 AND 5)

);


-- ============================================================
-- QUOTE REQUESTS
-- ============================================================

CREATE TABLE IF NOT EXISTS quote_requests (

    quote_id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT,

    company_name VARCHAR(150) NOT NULL,

    contact_name VARCHAR(150),

    email VARCHAR(150),

    phone VARCHAR(30),

    service_requested VARCHAR(150) NOT NULL,

    project_details TEXT,

    status VARCHAR(50) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_quote_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

);


-- ============================================================
-- APPOINTMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS appointments (

    appointment_id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT,

    company_name VARCHAR(150) NOT NULL,

    contact_name VARCHAR(150),

    email VARCHAR(150),

    phone VARCHAR(30),

    service_requested VARCHAR(150) NOT NULL,

    appointment_date DATE NOT NULL,

    appointment_time TIME NOT NULL,

    notes TEXT,

    status VARCHAR(50) DEFAULT 'Requested',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointment_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

);