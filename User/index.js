//ส่วน User
const express = require('express');
const path = require('path');
const app = express();
const changePage = require('./module/router/changePage');

// Use for module post want to get data from req.body
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes from login module
app.use('/', changePage);

app.listen(8080, () => {
    console.log("Server started at port 8080. Run in http://localhost:8080/");
});

