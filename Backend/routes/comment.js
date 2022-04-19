const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment')

router.get('/:productId', commentCtrl.getAllComment);
router.post('/create', commentCtrl.createComment);
router.put('/:commentId', commentCtrl.modifyComment);
router.delete('/:commentId', commentCtrl.deleteComment);

module.exports = router;