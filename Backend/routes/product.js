const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const productCtrl = require('../controllers/product')

router.get('/', productCtrl.getAllProduct);
router.post('/create', productCtrl.createProduct);
router.put('/:id', productCtrl.modifyProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;