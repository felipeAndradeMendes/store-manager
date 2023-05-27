const { productsService } = require('../services');

const listProducts = async (_req, res) => {
  try {
    const result = await productsService.listProducts();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const listById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await productsService.listById(id);
    if (type) {
      return res.status(404).json(message);
    }

    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const productName = newProduct.name;        
    const result = await productsService.createProduct(newProduct);
    res.status(201).json({ id: result, name: productName });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  listProducts,
  listById,
  createProduct,
};