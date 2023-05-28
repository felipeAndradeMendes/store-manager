const express = require('express');
const { productsController } = require('../controllers');
const { productValidation } = require('../middlewares/inputsValidation');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listById);
router.post('/', productValidation, productsController.createProduct);

module.exports = router;