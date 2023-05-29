const allSales = [
  {
    saleId: 1,
    date: '2023-05-26T22:30:33.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-26T22:30:33.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-26T22:30:33.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleId2 = [
  {
    date: '2023-05-26T22:30:33.000Z',
    productId: 3,
    quantity: 15,
  },
];

const insertSalesReturn = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 4,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
};

const newSale = [
  {
    productId: 2,
    quantity: 1,
  },
];

const returnFromCreateSale = {
  id: 4,
  itemsSold: [
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

module.exports = {
  allSales,
  saleId2,
  insertSalesReturn,
  newSale,
  returnFromCreateSale,
};