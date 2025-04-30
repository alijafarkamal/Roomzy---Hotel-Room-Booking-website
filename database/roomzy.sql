USE master;
GO

DROP DATABASE IF EXISTS Roomzy;
GO

CREATE DATABASE Roomzy;
GO

USE Roomzy;
GO

DROP TABLE IF EXISTS Payments, Bookings, Rooms, Hotels, Users;
GO

CREATE TABLE Users (
    id INT IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL CHECK (email LIKE '%@%.%'),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (LEN(password) >= 8),
    role VARCHAR(20) CHECK (role IN ('admin', 'customer')) NOT NULL,
    PRIMARY KEY (id)
);
GO

CREATE TABLE Hotels (
    id INT IDENTITY(1,1),
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
    PRIMARY KEY (id)
);
GO

CREATE TABLE Rooms (
    id INT IDENTITY(1,1),
    hotel_id INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    availability_status VARCHAR(20) CHECK (availability_status IN ('available', 'booked')) NOT NULL,
    description VARCHAR(500) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (hotel_id, id),
    FOREIGN KEY (hotel_id) REFERENCES Hotels(id) ON DELETE CASCADE
);
GO

INSERT INTO Hotels (name, location, rating) VALUES
('Grand Hyatt', 'Karachi, Pakistan', 4.5),
('Serena Hotel', 'Islamabad, Pakistan', 4.8),
('Pearl Continental', 'Lahore, Pakistan', 4.2),
('Pearl Continental Hotel', 'Karachi, Pakistan', 4.6),
('Marriott Hotel', 'Islamabad, Pakistan', 4.5),
('Avari Towers', 'Karachi, Pakistan', 4.4),
('Serena Hotel', 'Islamabad, Pakistan', 4.7),
('Movenpick Hotel', 'Karachi, Pakistan', 4.3),
('Faletti''s Hotel', 'Lahore, Pakistan', 4.2),
('Luxus Grand Hotel', 'Lahore, Pakistan', 4.4),
('Hotel One', 'Lahore, Pakistan', 4.1),
('Swat Serena Hotel', 'Swat, Pakistan', 4.5),
('Shangrila Resort', 'Skardu, Pakistan', 4.8),
('Hunza Serena Inn', 'Hunza, Pakistan', 4.6),
('Faisalabad Serena Hotel', 'Faisalabad, Pakistan', 4.3),
('Dreamworld Resort', 'Karachi, Pakistan', 4.2),
('Beach Luxury Hotel', 'Karachi, Pakistan', 4.0),
('Nishat Hotel', 'Lahore, Pakistan', 4.5),
('Grand Regent Hotel', 'Faisalabad, Pakistan', 4.1),
('The Residency Hotel', 'Lahore, Pakistan', 4.4),
('Shelton''s Rezidor Hotel', 'Peshawar, Pakistan', 4.2),
('Arcadian Sprucewoods Resort', 'Nathiagali, Pakistan', 4.6),
('Green Palace Guest House', 'Murree, Pakistan', 4.0),
('Islamabad Hotel', 'Islamabad, Pakistan', 4.1),
('PC Bhurban', 'Bhurban, Pakistan', 4.7),
('Gilgit Serena Hotel', 'Gilgit, Pakistan', 4.5),
('Lockwood Hotel', 'Murree, Pakistan', 4.0),
('Royal Inn Hotel', 'Multan, Pakistan', 4.1),
('The Ritz-Carlton', 'New York, USA', 4.9),
('Burj Al Arab', 'Dubai, UAE', 4.8),
('Marina Bay Sands', 'Singapore', 4.7),
('The Peninsula', 'Hong Kong', 4.8),
('Hotel de Crillon', 'Paris, France', 4.7),
('Mandarin Oriental', 'London, UK', 4.6),
('Four Seasons Hotel', 'Sydney, Australia', 4.7),
('Waldorf Astoria', 'Berlin, Germany', 4.6),
('The St. Regis', 'Mumbai, India', 4.5),
('The Ritz', 'London, UK', 4.7),
('Shangri-La Hotel', 'Tokyo, Japan', 4.8),
('Taj Lake Palace', 'Udaipur, India', 4.9),
('The Plaza', 'New York, USA', 4.6),
('Fairmont Hotel', 'Vancouver, Canada', 4.5),
('Rosewood Hotel', 'Abu Dhabi, UAE', 4.7),
('Park Hyatt', 'Sydney, Australia', 4.6),
('Grand Hyatt', 'Bangkok, Thailand', 4.5),
('The Westin', 'Milan, Italy', 4.4),
('Aman Tokyo', 'Tokyo, Japan', 4.8),
('InterContinental Hotel', 'Madrid, Spain', 4.5);
GO

INSERT INTO Rooms (hotel_id, room_type, price, availability_status, description)
SELECT h.id, 
       CASE 
           WHEN r.n = 1 THEN 'Deluxe'
           WHEN r.n = 2 THEN 'Standard'
           WHEN r.n = 3 THEN 'Suite'
           WHEN r.n = 4 THEN 'Family'
           WHEN r.n = 5 THEN 'Economy'
       END,
       CASE 
           WHEN r.n = 1 THEN 150.00
           WHEN r.n = 2 THEN 100.00
           WHEN r.n = 3 THEN 250.00
           WHEN r.n = 4 THEN 200.00
           WHEN r.n = 5 THEN 80.00
       END,
       'available',
       'Room ' + CAST(r.n AS VARCHAR(10)) + ' at ' + h.name
FROM Hotels h
CROSS JOIN (VALUES (1),(2),(3),(4),(5)) AS r(n);
GO


CREATE TABLE Bookings (
    id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    hotel_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('confirmed', 'pending', 'canceled')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id, room_id) REFERENCES Rooms(hotel_id, id) ON DELETE CASCADE,
    CONSTRAINT chk_dates CHECK (check_in_date < check_out_date),
    CONSTRAINT unique_booking UNIQUE (hotel_id, room_id, check_in_date, check_out_date)
);
GO

CREATE TABLE Payments (
    id INT IDENTITY(1,1),
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'completed', 'failed')) NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(id) ON DELETE CASCADE
);
GO

INSERT INTO Users (name, email, phone_number, password, role) VALUES
('Ali Khan', 'ali.khan@example.com', '+923001234567', 'hashedpassword123', 'customer'),
('Ayesha Malik', 'ayesha.malik@example.com', '+923112345678', 'securehash123', 'admin'),
('Hassan Raza', 'hassan.raza@example.com', '+923212345678', 'hashpass456', 'customer'),
('Fatima Sheikh', 'fatima.sheikh@example.com', '+923322345678', 'hashpass789', 'customer'),
('Bilal Ahmed', 'bilal.ahmed@example.com', '+923432345678', 'hashpass101', 'customer');
GO


INSERT INTO Bookings (user_id, room_id, hotel_id, check_in_date, check_out_date, status) VALUES
(1, 1, 1, '2025-04-01', '2025-04-05', 'confirmed'),
(3, 2, 1, '2025-04-02', '2025-04-04', 'pending'),
(4, 3, 2, '2025-04-10', '2025-04-15', 'confirmed');
GO

INSERT INTO Payments (booking_id, amount, payment_status) VALUES
(1, 600.00, 'completed'),
(2, 200.00, 'pending'),
(3, 1250.00, 'completed');
GO

CREATE VIEW AvailableRooms AS
SELECT r.hotel_id, r.id AS room_id, r.room_type, r.price, r.description, h.name AS hotel_name, h.location
FROM Rooms r
JOIN Hotels h ON r.hotel_id = h.id
WHERE r.availability_status = 'available';
GO

CREATE VIEW TopHotelsByBookings AS
SELECT TOP 5 h.id, h.name, h.location, h.rating, COUNT(b.id) AS booking_count
FROM Hotels h
LEFT JOIN Bookings b ON h.id = b.hotel_id AND b.status = 'confirmed'
GROUP BY h.id, h.name, h.location, h.rating
ORDER BY booking_count DESC;
GO

CREATE VIEW UserBookingSummary AS
SELECT u.id AS user_id, u.name AS user_name, u.email, COUNT(b.id) AS total_bookings, 
       SUM(CASE WHEN b.status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_bookings
FROM Users u
LEFT JOIN Bookings b ON u.id = b.user_id
GROUP BY u.id, u.name, u.email;
GO

CREATE VIEW PendingPayments AS
SELECT b.id AS booking_id, u.name AS user_name, r.room_type, b.check_in_date, b.check_out_date, p.amount, p.payment_status
FROM Bookings b
JOIN Users u ON b.user_id = u.id
JOIN Rooms r ON b.hotel_id = r.hotel_id AND b.room_id = r.id
JOIN Payments p ON b.id = p.booking_id
WHERE p.payment_status = 'pending';
GO

CREATE VIEW BookingStatusOverview AS
SELECT status, COUNT(*) AS total_bookings FROM Bookings
GROUP BY status;
GO

SELECT * FROM BookingStatusOverview;
GO

CREATE VIEW HotelRevenue AS
SELECT h.id, h.name, h.location, SUM(p.amount) AS total_revenue
FROM Hotels h
LEFT JOIN Bookings b ON h.id = b.hotel_id
LEFT JOIN Payments p ON b.id = p.booking_id AND p.payment_status = 'completed'
GROUP BY h.id, h.name, h.location;
GO

CREATE VIEW RoomBookingDetails AS
SELECT b.id AS booking_id, h.name AS hotel_name, r.room_type, r.price, b.check_in_date, b.check_out_date, b.status, u.name AS user_name
FROM Bookings b
JOIN Rooms r ON b.hotel_id = r.hotel_id AND b.room_id = r.id
JOIN Hotels h ON r.hotel_id = h.id
JOIN Users u ON b.user_id = u.id;
GO

CREATE VIEW UserPaymentHistory AS
SELECT u.id AS user_id, u.name AS user_name, b.id AS booking_id, p.amount, p.payment_status, p.payment_date
FROM Users u
JOIN Bookings b ON u.id = b.user_id
JOIN Payments p ON b.id = p.booking_id;
GO

CREATE VIEW HotelRoomAvailability AS
SELECT h.id AS hotel_id, h.name AS hotel_name, 
COUNT(CASE WHEN r.availability_status = 'available' THEN 1 END) AS available_rooms,
COUNT(CASE WHEN r.availability_status = 'booked' THEN 1 END) AS booked_rooms
FROM Hotels h
LEFT JOIN Rooms r ON h.id = r.hotel_id
GROUP BY h.id, h.name;
GO

SELECT * FROM Users WHERE email = 'customer@example.com';
-- SELECT * FROM Hotels;
-- SELECT * FROM Payments;
-- SELECT * FROM Users;
-- SELECT * FROM Rooms;
-- SELECT * FROM Bookings;
GO

















