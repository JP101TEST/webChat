const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    // Check if userData exists in Session Storage
    const userData = req.session.userData;
    console.log(`/: ${userData}`);
    // If userData exists, redirect to home.html
    if (userData) {
        const filePath = path.join(__dirname, '../../public/view', 'home.html');
        res.sendFile(filePath);
    } else {
        // If userData does not exist, redirect to login page
        res.redirect('/login');
    }
});


module.exports = router;