const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../../public/view', 'home.html');
    res.sendFile(filePath);
});

router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../../public/view', 'login.html');
    res.sendFile(filePath);
});

router.get('/profile', (req, res) => {
    const filePath = path.join(__dirname, '../../public/view', 'profile.html');
    res.sendFile(filePath);
});

router.get('/addFriend', (req, res) => {
    const filePath = path.join(__dirname, '../../public/view', 'addFriend.html');
    res.sendFile(filePath);
});

module.exports = router;