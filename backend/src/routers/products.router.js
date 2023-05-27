const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listById);
router.post('/', productsController.createProduct);

module.exports = router;