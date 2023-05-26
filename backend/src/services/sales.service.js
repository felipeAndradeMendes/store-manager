const { salesModel } = require('../models');

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

module.exports = {
  listSales,
  listById,
};