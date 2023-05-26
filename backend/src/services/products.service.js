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

module.exports = {
  listProducts,
  listById,
};