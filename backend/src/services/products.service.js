const { productsModel } = require('../models');

const listProducts = async () => {
  const result = await productsModel.listProducts();
  return result;
};

const listById = async (id) => {
  const result = await productsModel.listById(id);

  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  }
  return { type: null, message: result };
};

const createProduct = async (newProduct) => {
  const result = await productsModel.createProduct(newProduct);
  return result;
};

const updateProduct = async (id, name) => {
  const result = productsModel.updateProduct(id, name);
  const verifyId = await productsModel.listById(id);
  
  if (!verifyId) {
    return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  }
  return result;
};

const deleteProduct = async (id) => {
  const verifyId = await productsModel.listById(id);

  if (!verifyId) {
    return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  }
  const result = await productsModel.deleteProduct(id);
  return result;
};

module.exports = {
  listProducts,
  listById,
  createProduct,
  updateProduct,
  deleteProduct,
};