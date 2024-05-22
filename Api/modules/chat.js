const express = require('express');
const router = express.Router();
const db = require('./database.js');

// Middleware to enable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.post('/blockFriend', async (req, res) => {
    //console.log(req.body);
    const { idFriend, idUserFriend } = req.body;
    try {
        const sql = 'UPDATE `friends` SET `id_user` = ?, `status` = ? WHERE `id_friend` = ?';
        const value = [idUserFriend, 2, idFriend];
        await db.execute(sql, value);
        res.status(200).json({ message: 'Block friend successfully' });
    } catch (error) {
        console.error('Add friend error:', error);
        res.status(500).json({ message: 'Failed to block friend' });
    }
});

router.post('/unblockFriend', async (req, res) => {
    //console.log(req.body);
    const { idFriend } = req.body;
    try {
        const sql = 'UPDATE `friends` SET `id_user` = ?, `status` = ? WHERE `id_friend` = ?';
        const value = [null, 1, idFriend];
        await db.execute(sql, value);
        res.status(200).json({ message: 'Unblock friend successfully' });
    } catch (error) {
        console.error('Add friend error:', error);
        res.status(500).json({ message: 'Failed to unblock friend' });
    }
});

router.post('/sendMessage', async (req, res) => {
    //console.log(req.body);
    const { idRoom, idSendUser, message } = req.body;
    try {
        const sql = 'INSERT INTO `messages`(`id_room`, `id_user`, `message`) VALUES (?,?,?)';
        const value = [idRoom, idSendUser, message];
        await db.execute(sql, value);
        res.status(200).json({ message: 'Send message successfully' });
    } catch (error) {
        console.error('Add friend error:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});
module.exports = router;