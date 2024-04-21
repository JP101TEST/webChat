// register

const express = require('express');
const router = express.Router();

const db = require('./database.js');

// Middleware to enable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.post('/register', async (req, res) => {
    try {
        // Extract data from request body
        const { fname, lname, email, password } = req.body;

        // Call function to insert user into SQL database
        const insertId = await registerToSQL({ fname, lname, password, email });

        // Respond with success message and insert ID
        res.json({ success: true, message: 'User registered successfully', insertId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Failed to register user' });
    }
});

async function registerToSQL(user) {
    try {
        const sql = 'INSERT INTO users (`first_name`, `last_name`, `email`, `password`) VALUES (?, ?, ?, ?)';
        const values = [user.fname, user.lname, user.email, user.password];
        const [result] = await db.execute(sql, values);
        console.log('User inserted successfully:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Insertion error:', error);
        throw error;
    }
}

router.post('/login', async (req, res) => {
    try {
        const id = 1;
        const [rows, fields] = await db.query('SELECT *,id AS id_test FROM `users` WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw error;
    }
});

module.exports = router;