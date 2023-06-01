const express = require('express');
const { salesController } = require('../controllers');
const { salesValidation, productQuantityValidation } = require('../middlewares/inputsValidation');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listById);
router.post('/', salesValidation, salesController.createSale);
router.delete('/:id', salesController.deleteSale);
router.put(
'/:saleId/product/:productId/quantity', 
productQuantityValidation,
salesController.updateQuantity,
);

module.exports = router;