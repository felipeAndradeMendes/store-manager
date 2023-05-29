const { salesModel, productsModel } = require('../models');

const listSales = async () => {
  const result = await salesModel.listSales();
  return result;
};

const listById = async (id) => {
  const result = await salesModel.listById(id);

  if (result.length === 0) {
    return { type: 'SALES_NOT_FOUD', message: 'Sale not found' };
  }
  return { type: null, message: result };
};

const createSale = async (newSale) => {
  let idValidated = true;
  const salesMap = newSale.map(async (sale) => {
    const id = await productsModel.listById(sale.productId);
    console.log('PRODUCT ID:', id);
    if (!id) {
      idValidated = false;
      // return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
  });
  await Promise.all(salesMap);
  if (idValidated) {
    const result = await salesModel.createSale(newSale);
    return result;
  } 
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  // return result;
};

module.exports = {
  listSales,
  listById,
  createSale,
};