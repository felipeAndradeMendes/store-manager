const saleId2 = [
  {
    date: '2023-05-26T22:30:33.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesList = [
  {
    saleId: 1,
    date: '2023-05-29T19:39:08.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-29T19:39:08.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-29T19:39:08.000Z',
    productId: 3,
    quantity: 15,
  },
];

const returnFromSales = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
];

const returnedIdFromCreateSales = { 
  id: 1, name: 'Martelo de Thor', 
};

const returnFromValidateId = [
  {
    date: '2023-05-31T18:49:53.000Z',
    productId: 3,
    quantity: 15,
  },
];

const updatedQuantityDate = [
  { date: '2023-06-01T13:31:54.000Z', 
},
];

const returnUpdatedQuantityObj = {
  date: '2023-06-01T13:31:54.000Z',
  productId: 3,
  quantity: 50,
  saleId: 2,
};

module.exports = {
  saleId2,
  salesList,
  returnFromSales,
  newSale,
  returnedIdFromCreateSales,
  returnFromValidateId,
  updatedQuantityDate,
  returnUpdatedQuantityObj,
};