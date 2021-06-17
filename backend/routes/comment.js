const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', commentCtrl.findAllComments);
router.get('/:id', auth, commentCtrl.findOneComment);
router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;