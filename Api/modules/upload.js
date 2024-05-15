const express = require('express');
const router = express.Router();
const db = require('./database.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Middleware to enable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image/user_image/'); // Set the destination folder
    },
    filename: function (req, file, cb) {
        // Set unique filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

router.post('/imageUser', upload.single('file'), async (req, res) => {
    try {
        // File uploaded successfully
        //console.log('File uploaded:', req.file.filename);
        //console.log('User id uploaded:', req.body.userId);
        // Check image from database.
        const imageDefault = await checkImageUserFromDatabase(req.body.userId);
        console.log("imageDefault :",imageDefault);
        if (!imageDefault.result) {
            //console.log("imageDefault :", false);
            deleteImage(imageDefault.image, 'public/image/user_image/');
        }
        // Update image
        await updatetUserImage(req.file.filename, req.body.userId);

        res.json({ image: req.file.filename});
        //res.status(200).send('File uploaded successfully');
    } catch (error) {
        // Error handling
        console.error('Error uploading file:', error.message);
        res.status(500).send('Error uploading file');
    }
});

router.post('/deletImage', upload.none(), async (req, res) => {
    try {
        console.log('File delete:', req.body.imageFile);
        deleteImage(req.body.imageFile, 'public/image/user_image/');
        res.status(200).send('File delete successfully');
    } catch (error) {
        // Error handling
        console.error('Error delete file:', error.message);
        res.status(500).send('Error delete file');
    }
});

// Function to delete an image file
function deleteImage(fileName, folderPath) {
    const filePath = path.join(folderPath, fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });
}


async function checkImageUserFromDatabase(userId) {
    const [rows, fields] = await db.query('SELECT image FROM `users` WHERE `id_user` = ?', [userId]);
    let result = { result: true };
    //console.log(rows[0].image);
    if (rows[0].image != "user_default.png") {
        result.result = false;
        result.image = rows[0].image;
    }
    return result;
    //console.log(result);
}

async function updatetUserImage(image, userId) {
    try {
        // Update the user's image in the database
        const sql = 'UPDATE `users` SET `image` = ? WHERE `id_user` = ?';
        const values = [image, userId];
        const [result] = await db.execute(sql, values);

        console.log("User image updated successfully");
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
}
module.exports = router;