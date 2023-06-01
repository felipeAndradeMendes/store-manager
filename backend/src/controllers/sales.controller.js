const { salesService } = require('../services');

const listSales = async (_req, res) => {
  try {
    const result = await salesService.listSales();
    res.status(200).json(result);    
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const listById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await salesService.listById(id);
    
    if (type) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const createSale = async (req, res) => {
  try {
    const newSale = req.body;
    const result = await salesService.createSale(newSale);

    if (result.type) {
      return res.status(404).json({ message: result.message });
    }
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSale(id);

    if (result.type) {
      return res.status(404).json(result.message);
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { saleId, productId } = req.params;
    const { quantity } = req.body;
    console.log('IDs E QUANTITY:', saleId, productId, quantity);
    
    const result = await salesService.updateQuantity(saleId, productId, quantity);

    if (result.type) {
      return res.status(400).json(result.message);
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  listSales,
  listById,
  createSale,
  deleteSale,
  updateQuantity,
};