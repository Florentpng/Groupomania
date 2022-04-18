const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product')

router.get('/', productCtrl.getAllProduct);
router.get('/:productId', productCtrl.getProduct);
router.post('/create', productCtrl.createProduct);
router.put('/:productId', productCtrl.modifyProduct);
router.delete('/:productId', productCtrl.deleteProduct);

module.exports = router;