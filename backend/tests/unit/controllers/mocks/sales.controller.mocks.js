const mockDate = '2023-05-29T21:03:53.000Z';

const returnedSalesList = [
  {
    saleId: 1,
    date: mockDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: mockDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: mockDate,
    productId: 3,
    quantity: 15,
  },
];

const saleId1 = [
  {
    date: mockDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: mockDate,
    productId: 2,
    quantity: 10,
  },
];

const returnUpdatedQuantityObj = {
  date: '2023-06-01T13:31:54.000Z',
  productId: 3,
  quantity: 50,
  saleId: 2,
};

module.exports = {
  returnedSalesList,
  saleId1,
  returnUpdatedQuantityObj,
};