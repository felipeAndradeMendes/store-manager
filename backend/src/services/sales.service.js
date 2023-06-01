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
    // console.log('PRODUCT ID:', id);
    if (!id) {
      idValidated = false;
    }
  });
  await Promise.all(salesMap);
  if (idValidated) {
    const result = await salesModel.createSale(newSale);
    // console.log(result);
    return result;
  } 
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const deleteSale = async (id) => {
  const idValidated = await salesModel.listById(id);

  if (idValidated.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  }
  const result = await salesModel.deleteSale(id);
  return result;
};

const updateQuantity = async (saleId, productId, quantity) => {
  const validatedSaleId = await salesModel.listById(saleId);
  const validateProductId = await productsModel.listByIdInSales(productId);
  console.log('Validation SaleId:', validatedSaleId);
  console.log('Validation ProductID:', validateProductId);
  if (validatedSaleId.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  }
  if (!validateProductId) {
    return { type: 'PRODUCT_NOT_FOUND_IN_SALE', message: { message: 'Product not found in sale' } };
  }
  const [result] = await salesModel.updateQuantity(saleId, productId, quantity);
  // console.log(result);
  const { date } = result;
  // console.log(date);
  return { date,
    productId: Number(productId),
    quantity,
    saleId: Number(saleId),
  };
};

module.exports = {
  listSales,
  listById,
  createSale,
  deleteSale,
  updateQuantity,
};