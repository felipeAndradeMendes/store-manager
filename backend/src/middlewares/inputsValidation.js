const { productSchema, salesSchema, productQuantitySchema } = require('./joi.schema');

const productValidation = async (req, res, next) => {
  const newProduct = req.body;
  const { error } = await productSchema.validate(newProduct);

  if (error && error.message === '"name" length must be at least 5 characters long') {
    return res.status(422).json({ message: error.message });
  }
  if (error && error.message === '"name" is required') {
    return res.status(400).json({ message: error.message });
  }
  // console.log('RESULT:', error);
  next();
};

const productQuantityValidation = async (req, res, next) => {
  const quantity = req.body;
  const { error } = await productQuantitySchema.validate(quantity);

  if (error && error.message.includes('required')) {
      // console.log('ERROR:', error);
      return res.status(400).json({ message: error.message });
    }

    if (error && error.message.includes('greater')) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
};

const salesValidation = async (req, res, next) => {
  const newSales = req.body;

  let tudoOk = true;
  newSales.map((sale) => {
    const { error } = salesSchema.validate(sale);
  
    if (error && error.message.includes('required')) {
      // console.log('ERROR:', error);
      tudoOk = false;
      return res.status(400).json({ message: error.message });
    }

    if (error && error.message.includes('greater')) {
      tudoOk = false;
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return true;
  });
  // console.log('Acabou o map!');

  return tudoOk && next();
};

module.exports = {
  productValidation,
  salesValidation,
  productQuantityValidation,
};