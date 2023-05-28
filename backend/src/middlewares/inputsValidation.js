const { productSchema } = require('./joi.schema');

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

module.exports = {
  productValidation,
};