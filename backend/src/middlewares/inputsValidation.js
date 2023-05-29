const { productSchema, salesSchema } = require('./joi.schema');

const productValidation = async (req, res, next) => {
  const newProduct = req.body;
  const { error } = await productSchema.validate(newProduct);

  if (error && error.message === '"name" length must be at least 5 characters long') {
    return res.status(422).json({ message: error.message });
  }
  if (error && error.message === '"name" is required') {
    return res.status(400).json({ message: error.message });
  }
  console.log('RESULT:', error);
  next();
};

const salesValidation = async (req, res, next) => {
  const newSales = req.body;

  newSales.forEach((sale) => {
    const { error } = salesSchema.validate(sale);
  
    if (error && error.message.includes('required')) {
      console.log('ERROR:', error);
      return res.status(400).json({ message: error.message });
    }

    // if (error && error.message === )
    // parei no começo da implementação do segundo validate;
});
  next();
};

module.exports = {
  productValidation,
  salesValidation,
};