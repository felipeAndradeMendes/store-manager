const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const productQuantitySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  productSchema,
  salesSchema,
  productQuantitySchema,
};