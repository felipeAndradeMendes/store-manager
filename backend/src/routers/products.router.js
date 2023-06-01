const express = require('express');
const { productsController } = require('../controllers');
const { productValidation } = require('../middlewares/inputsValidation');

const router = express.Router();

router.get('/search', productsController.searchProduct);
router.get('/', productsController.listProducts);
router.get('/:id', productsController.listById);
router.post('/', productValidation, productsController.createProduct);
router.put('/:id', productValidation, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;