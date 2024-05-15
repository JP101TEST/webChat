const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('./database.js');

// Middleware to enable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Define a route to serve image files
router.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.resolve(__dirname, '../public/image/user_image/', filename);
    res.sendFile(imagePath);
});

router.post('/searchFriends', async (req, res) => {
    //console.log(req.body);
    const { username, userId } = req.body;
    try {
        // const [rows, fields] = await db.query('SELECT * FROM (SELECT u.id_user AS id_user , u.username AS username , u.image AS image FROM users AS u WHERE u.id_user NOT IN (SELECT uf.id_user FROM user_friend AS uf WHERE uf.id_friend IN ( SELECT id_friend FROM user_friend WHERE id_user = ? ) AND uf.id_user != ?)AND u.id_user != ?) AS u WHERE username LIKE ? ORDER BY username;', [userId, userId, userId, '%' + username + '%']);
        
        let sql = 'SELECT * FROM (SELECT u.id_user AS id_user, u.username AS username, u.image AS image FROM users AS u WHERE u.id_user NOT IN (SELECT uf.id_user FROM user_friend AS uf WHERE uf.id_friend IN (SELECT id_friend FROM user_friend WHERE id_user = ?) AND uf.id_user != ?) AND u.id_user != ?';
        const values = [userId, userId, userId];

        // Add condition for username search if provided
        if (username !== '') {
            sql += ' AND username LIKE ? ) AS u';
            values.push('%' + username + '%');
        }else{
            sql += ' ORDER BY username LIMIT 100) AS u';
        }
        
        const [rows, fields] = await db.query(sql, values);
        res.status(200).json({ message: 'get friend lists successfully', list: rows });
    } catch (error) {
        console.error('Add friend error:', error);
        res.status(500).json({ message: 'Failed to get friend lists' });
    }
});

router.post('/searchRooms', async (req, res) => {
    console.log(req.body);
    const { username, userId } = req.body;
    try {
        // const [rows, fields] = await db.query('SELECT * FROM (SELECT u.id_user AS id_user , u.username AS username , u.image AS image FROM users AS u WHERE u.id_user NOT IN (SELECT uf.id_user FROM user_friend AS uf WHERE uf.id_friend IN ( SELECT id_friend FROM user_friend WHERE id_user = ? ) AND uf.id_user != ?)AND u.id_user != ?) AS u WHERE username LIKE ? ORDER BY username;', [userId, userId, userId, '%' + username + '%']);
        
        let sql = 'SELECT ur.id_room AS id_room , ur.id_user AS id_user , users.username AS username ,users.image AS image FROM (SELECT ur.id_room,ur.id_user FROM user_room AS ur WHERE ur.id_room IN (SELECT id_room FROM user_room WHERE id_user = ?)AND ur.id_user!= ?) AS ur INNER JOIN users  ON ur.id_user = users.id_user';
        const values = [userId, userId];

        // Add condition for username search if provided
        if (username !== '') {
            sql += ' AND username LIKE ?';
            values.push('%' + username + '%');
        }else{
            sql += ' ORDER BY username LIMIT 100';
        }
        
        const [rows, fields] = await db.query(sql, values);
        res.status(200).json({ message: 'get friend lists successfully', list: rows });
    } catch (error) {
        console.error('Add friend error:', error);
        res.status(500).json({ message: 'Failed to get friend lists' });
    }
});

module.exports = router;