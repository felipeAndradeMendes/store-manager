const { salesService } = require('../services');

const listSales = async (req, res) => {
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

module.exports = {
  listSales,
  listById,
};