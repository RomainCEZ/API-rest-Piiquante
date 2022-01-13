const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer');
const saucesController = require('../controllers/sauces')

router.get('/', saucesController.getAllSauces);
router.get('/:id', saucesController.getOneSauce);
router.post('/', multer, saucesController.postSauce);
router.put('/:id', multer, saucesController.updateSauce);
router.delete('/:id', saucesController.deleteSauce);
router.post('/:id/like', saucesController.updateLikes);

module.exports = router;