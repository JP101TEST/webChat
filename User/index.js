//ส่วน User
const express = require('express');
const session = require('express-session'); // เรียกใช้ sessions
const path = require('path');
const app = express();
const loginRoutes = require('./module/router/login');

// ประกาศใช้ sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    //const userData = req.session.userData;

    //req.session.userData = "AI";
    //console.log(userData);
    viewLogin(res);
});

// Use routes from login module
app.use('/', loginRoutes);

app.listen(8080, () => {
    console.log("Server started at port 8080. Run in http://localhost:8080/");
});

// Function
function viewLogin(res) {
    // Construct the file path using path.join()
    const filePath = path.join(__dirname, 'public/view', 'login.html');
    // Send the file
    res.sendFile(filePath);
}
