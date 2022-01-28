const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const saucesController = require('../controllers/sauces');

router.get('/', auth, saucesController.getAllSauces);
router.get('/:id', auth, saucesController.getSauceById);
router.post('/', auth, multer, saucesController.postSauce);
router.put('/:id', auth, multer, saucesController.updateSauce);
router.delete('/:id', auth, saucesController.deleteSauce);
router.post('/:id/like', auth, saucesController.updateLikes);

module.exports = router;