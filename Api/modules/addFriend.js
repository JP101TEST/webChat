const express = require('express');
const router = express.Router();
const db = require('./database.js');

// Middleware to enable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.post('/addfriend', async (req, res) => {
    //console.log(req.body);
    const { friendId, userId } = req.body;
    try {
        // Insert into 'friends' table
        const [insertResultFriend, _friend] = await db.query('INSERT INTO friends () VALUES ()');
        const lastInsertedIdFriend = insertResultFriend.insertId;
        // Insert into 'rooms' table
        const [insertResultRoom, _room] = await db.query('INSERT INTO rooms () VALUES ()');
        const lastInsertedIdRoom = insertResultRoom.insertId;
        // Insert into 'user_friend' table
        const sqlFriend = 'INSERT INTO user_friend (id_friend, id_user) VALUES (?, ?), (?, ?)';
        const valuesFriend = [lastInsertedIdFriend, friendId, lastInsertedIdFriend, userId];
        await db.execute(sqlFriend, valuesFriend);
        // Insert into 'room_user' table
        const sqlRoom = 'INSERT INTO user_room (id_room, id_user) VALUES (?, ?), (?, ?)';
        const valuesRoom = [lastInsertedIdRoom, friendId, lastInsertedIdRoom, userId];
        await db.execute(sqlRoom, valuesRoom);
        res.status(200).json({ message: 'Add friend successfully'});
    } catch (error) {
        console.error('Add friend error:', error);
        res.status(500).json({ message: 'Failed to add friend' });
    }
});

module.exports = router;