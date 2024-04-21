//ส่วนของ API

const express = require('express');
const app = express();
const loginRegisterRoutes = require('./modules/loginRegister');

// Use for module post want to get data from req.body
app.use(express.json());

// Use routes from calculate module
app.get('/',(req, res) => {
    res.send("Welcome");
});

// Use routes from calculate module
app.use('/loginRegister', loginRegisterRoutes );
// Use sub funtions from loginRegister module is /loginRegister/functions like /loginRegister/login or /loginRegister/register

app.listen(8000, () => {
    console.log("Start server at port 8000.Run in http://localhost:8000/");
});