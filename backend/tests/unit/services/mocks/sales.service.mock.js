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

module.exports = {
  saleId2,
  salesList,
  returnFromSales,
  newSale,
  returnedIdFromCreateSales,
};