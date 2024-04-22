// register

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const db = require('./database.js');

// Middleware to enable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.post('/register', async (req, res) => {
    try {
        let result = { success: false };
        // Check input are not empty.
        if (req.body.username === '' || req.body.password === '' || req.body.email === '') {
            if (req.body.username === '') result.messageUsernameError = "Username is empty";
            if (req.body.password === '') result.messagePasswordError = "Password is empty";
            if (req.body.email === '') result.messageEmailError = "Email is empty";
            console.log(result);
            res.json(result);
            return;
        }
        // Check username is have same in database

        // Check email is have same in database

        // Extract data from request body
        const { username, password, email } = req.body;
        const hashedPassword = await hashingPassword(password);
        // Call function to insert user into SQL database
        await insertUser({ username, password: hashedPassword, email });

        // Respond with success message and insert ID
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Failed to register user' });
    }
});

async function hashingPassword(password) {
    try {
        // Generate a salt (a random string) to be used during hashing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Return the hashed password
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function insertUser(user) {
    try {
        console.log("insertUser :", user);
        const sql = 'INSERT INTO users (`username`, `password`, `email`) VALUES ( ?, ?, ?)';
        const values = [user.username, user.password, user.email];
        const [result] = await db.execute(sql, values);
        //console.log('User inserted successfully:', result);
        //return result.insertId;
    } catch (error) {
        console.error('Insertion error:', error);
        throw error;
    }
}

async function checkUsername(username) {
    try {
        
    } catch (error) {
        console.error('Insertion error:', error);
        throw error;
    }
}

async function checkEmail(email) {
    try {
        
    } catch (error) {
        console.error('Insertion error:', error);
        throw error;
    }
}

router.post('/login', async (req, res) => {
    try {
        // Check input are not empty.
        if (req.body.username === '' || req.body.password === '') {
            res.json({ success: false, messageError: "Username or password is empty" });
            return;
        }
        const { username, password } = req.body;
        const [rows, fields] = await db.query('SELECT * FROM `users` WHERE `username` = ?', [username]);
        // Check have this username
        if (rows.length > 0) {
            // Check password
            const passwordMatch = await comparePassword(password, rows[0].password);
            res.json({ success: passwordMatch, messageError: "Password is incorrect" });
        } else {
            res.json({ success: false, messageError: "Username not found" });
        }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw error;
    }
});

async function comparePassword(inputPassword, hashedPassword) {
    try {
        // Compare the provided password with the hashed password from the database
        const result = await bcrypt.compare(inputPassword, hashedPassword);

        // Return the comparison result
        return result;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

router.get('/showAllUser', async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT *,id AS id_test FROM `users` WHERE 1 ');
        res.json(rows);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw error;
    }
});



module.exports = router;