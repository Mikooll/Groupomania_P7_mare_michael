const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', messageCtrl.findAllMessages);
router.get('/:id', auth, messageCtrl.findOneMessage);
router.get('/user/:id', auth, messageCtrl.findAllSpecificMessages);
router.post('/', auth, multer, messageCtrl.createMessage);
router.put('/:id', auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

module.exports = router; 