const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const profileCtrl = require('../controllers/profile')

router.get('/:userId', profileCtrl.getProfile);
router.get('/exist/:userId', profileCtrl.getExistProfile);
router.post('/create', profileCtrl.createProfile);
router.put('/:userId', profileCtrl.modifyProfile);
router.delete('/:userId', profileCtrl.deleteProfile);

module.exports = router;