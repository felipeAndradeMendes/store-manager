const express = require('express');
const { salesController } = require('../controllers');
const { salesValidation } = require('../middlewares/inputsValidation');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listById);
router.post('/', salesValidation, salesController.createSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;