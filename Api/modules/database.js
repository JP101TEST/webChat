const mysql = require('mysql2/promise');

// MySQL Settings
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat_app',
    port: 3306
});

// No need for connection.connect()

// // Testing the connection
// (async () => {
//     try {
//         const connection = await pool.getConnection();
//         console.log("Database Connected!");
//         connection.release(); // Release the connection back to the pool
//     } catch (error) {
//         console.error("Database Connection Error:", error);
//     }
// })();

// Function to attempt database connection
async function connectToDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log("Database Connected!");
        connection.release(); // Release the connection back to the pool
        return true; // Return true if connection successful
    } catch (error) {
        console.error("Database Connection Error:", error);
        return false; // Return false if connection failed
    }
}

// Attempt database connection
async function checkDatabaseConnection() {
    let connected = await connectToDatabase();
    while (!connected) {
        console.log("Retrying database connection in 5 seconds...");
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        connected = await connectToDatabase();
    }
}

// Testing the connection
checkDatabaseConnection();

module.exports = pool;
