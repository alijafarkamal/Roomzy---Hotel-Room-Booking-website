const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');
const jwt = require('jsonwebtoken');           
const bcrypt = require('bcryptjs');            

const authenticateToken = (requiredRole = null) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }
            next();
        } catch (err) {
            res.status(403).json({ message: 'Invalid token' });
        }
    };
};

router.post('/register', async (req, res) => {
    const { name, email, phone_number, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('phone_number', sql.VarChar, phone_number)
            .input('password', sql.VarChar, hashedPassword)
            .input('role', sql.VarChar, role || 'customer')
            .query(`
                INSERT INTO Users (name, email, phone_number, password, role)
                VALUES (@name, @email, @phone_number, @password, @role)
            `);
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');
        if (result.recordset.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/reset-password', authenticateToken(), async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user.id;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, userId)
            .input('password', sql.VarChar, hashedPassword)
            .query('UPDATE Users SET password = @password WHERE id = @id');
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/users', async (req, res) => {
    const { name, email, phone_number, password, role } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('phone_number', sql.VarChar, phone_number)
            .input('password', sql.VarChar, password)
            .input('role', sql.VarChar, role)
            .query(`
                INSERT INTO Users (name, email, phone_number, password, role)
                VALUES (@name, @email, @phone_number, @password, @role)
            `);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, password, role } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('phone_number', sql.VarChar, phone_number)
            .input('password', sql.VarChar, password)
            .input('role', sql.VarChar, role)
            .query(`
                UPDATE Users 
                SET name = @name, email = @email, phone_number = @phone_number, 
                    password = @password, role = @role
                WHERE id = @id
            `);
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Users WHERE id = @id');
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/hotels', async (req, res) => {
    const { name, location, rating } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('location', sql.VarChar, location)
            .input('rating', sql.Decimal(2, 1), rating)
            .query(`
                INSERT INTO Hotels (name, location, rating)
                VALUES (@name, @location, @rating)
            `);
        res.status(201).json({ message: 'Hotel created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/hotels', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Hotels');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/hotels/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, rating } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('location', sql.VarChar, location)
            .input('rating', sql.Decimal(2, 1), rating)
            .query(`
                UPDATE Hotels 
                SET name = @name, location = @location, rating = @rating
                WHERE id = @id
            `);
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Hotel not found' });
        res.json({ message: 'Hotel updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/hotels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Hotels WHERE id = @id');
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Hotel not found' });
        res.json({ message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/rooms', async (req, res) => {
    const { hotel_id, room_type, price, availability_status, description } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('hotel_id', sql.Int, hotel_id)
            .input('room_type', sql.VarChar, room_type)
            .input('price', sql.Decimal(10, 2), price)
            .input('availability_status', sql.VarChar, availability_status)
            .input('description', sql.VarChar, description)
            .query(`
                INSERT INTO Rooms (hotel_id, room_type, price, availability_status, description)
                VALUES (@hotel_id, @room_type, @price, @availability_status, @description)
            `);
        res.status(201).json({ message: 'Room created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/rooms', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Rooms');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/rooms/:hotel_id/:id', async (req, res) => {
    const { hotel_id, id } = req.params;
    const { room_type, price, availability_status, description } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('hotel_id', sql.Int, hotel_id)
            .input('id', sql.Int, id)
            .input('room_type', sql.VarChar, room_type)
            .input('price', sql.Decimal(10, 2), price)
            .input('availability_status', sql.VarChar, availability_status)
            .input('description', sql.VarChar, description)
            .query(`
                UPDATE Rooms 
                SET room_type = @room_type, price = @price, availability_status = @availability_status, 
                    description = @description
                WHERE hotel_id = @hotel_id AND id = @id
            `);
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/rooms/:hotel_id/:id', async (req, res) => {
    const { hotel_id, id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('hotel_id', sql.Int, hotel_id)
            .input('id', sql.Int, id)
            .query('DELETE FROM Rooms WHERE hotel_id = @hotel_id AND id = @id');
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/bookings', async (req, res) => {
    const { user_id, room_id, hotel_id, check_in_date, check_out_date, status } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('room_id', sql.Int, room_id)
            .input('hotel_id', sql.Int, hotel_id)
            .input('check_in_date', sql.Date, check_in_date)
            .input('check_out_date', sql.Date, check_out_date)
            .input('status', sql.VarChar, status || 'pending')
            .query(`
                INSERT INTO Bookings (user_id, room_id, hotel_id, check_in_date, check_out_date, status, created_at)
                VALUES (@user_id, @room_id, @hotel_id, @check_in_date, @check_out_date, @status, CURRENT_TIMESTAMP)
            `);
        if (status === 'confirmed') {
            await pool.request()
                .input('hotel_id', sql.Int, hotel_id)
                .input('room_id', sql.Int, room_id)
                .query(`UPDATE Rooms SET availability_status = 'booked' WHERE hotel_id = @hotel_id AND id = @room_id`);
        }
        res.status(201).json({ message: 'Booking created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Bookings');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const pool = await poolPromise;
        const booking = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT room_id, hotel_id FROM Bookings WHERE id = @id');
        if (booking.recordset.length === 0) return res.status(404).json({ message: 'Booking not found' });
        const { room_id, hotel_id } = booking.recordset[0];

        await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.VarChar, status)
            .query('UPDATE Bookings SET status = @status WHERE id = @id');

        if (status === 'canceled') {
            await pool.request()
                .input('hotel_id', sql.Int, hotel_id)
                .input('room_id', sql.Int, room_id)
                .query(`UPDATE Rooms SET availability_status = 'available' WHERE hotel_id = @hotel_id AND id = @room_id`);
        } else if (status === 'confirmed') {
            await pool.request()
                .input('hotel_id', sql.Int, hotel_id)
                .input('room_id', sql.Int, room_id)
                .query(`UPDATE Rooms SET availability_status = 'booked' WHERE hotel_id = @hotel_id AND id = @room_id`);
        }
        res.json({ message: 'Booking updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const booking = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT room_id, hotel_id FROM Bookings WHERE id = @id');
        if (booking.recordset.length === 0) return res.status(404).json({ message: 'Booking not found' });
        const { room_id, hotel_id } = booking.recordset[0];

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Bookings WHERE id = @id');

        await pool.request()
            .input('hotel_id', sql.Int, hotel_id)
            .input('room_id', sql.Int, room_id)
            .query(`UPDATE Rooms SET availability_status = 'available' WHERE hotel_id = @hotel_id AND id = @room_id`);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/payments', async (req, res) => {
    const { booking_id, amount, payment_status } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('booking_id', sql.Int, booking_id)
            .input('amount', sql.Decimal(10, 2), amount)
            .input('payment_status', sql.VarChar, payment_status)
            .query(`
                INSERT INTO Payments (booking_id, amount, payment_status, payment_date)
                VALUES (@booking_id, @amount, @payment_status, CURRENT_TIMESTAMP)
            `);
        res.status(201).json({ message: 'Payment created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/payments', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Payments');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/payments/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, payment_status } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('amount', sql.Decimal(10, 2), amount)
            .input('payment_status', sql.VarChar, payment_status)
            .query(`
                UPDATE Payments 
                SET amount = @amount, payment_status = @payment_status
                WHERE id = @id
            `);
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Payment not found' });
        res.json({ message: 'Payment updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/payments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Payments WHERE id = @id');
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Payment not found' });
        res.json({ message: 'Payment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Functional Queries (Views)
router.get('/available-rooms', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM AvailableRooms');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/top-hotels', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM TopHotelsByBookings');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/user-summary/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query('SELECT * FROM UserBookingSummary WHERE user_id = @user_id');
        if (result.recordset.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/pending-payments', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM PendingPayments');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/booking-status', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM BookingStatusOverview');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/hotel-revenue', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM HotelRevenue');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/room-booking-details', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM RoomBookingDetails');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/user-payment-history/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query('SELECT * FROM UserPaymentHistory WHERE user_id = @user_id');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/hotel-room-availability', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM HotelRoomAvailability');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
