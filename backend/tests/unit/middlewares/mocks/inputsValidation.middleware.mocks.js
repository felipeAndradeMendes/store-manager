const newSales = [
  {
    productId: 8,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesWithoutProductId = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesWithoutQuantity = [
  {
    productId: 8,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesQuantityZero = [
  {
    productId: 8,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  newSales,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesQuantityZero,
};