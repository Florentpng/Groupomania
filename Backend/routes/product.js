const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const productCtrl = require('../controllers/product')

router.get('/', productCtrl.getAllProduct);
router.get('/:productId', productCtrl.getProduct);
router.post('/create', multer, productCtrl.createProduct);
router.put('/:productId', multer, productCtrl.modifyProduct);
router.delete('/:productId', productCtrl.deleteProduct);

module.exports = router;