const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/db/connection');
const { 
  allSales, 
  saleId2, 
  insertSalesReturn, 
  newSale, 
  returnFromCreateSale,
  updatedQuantityDate,
} = require('./mocks/sales.model.mocks');

describe('Testes de unidade do Model de Sales', function () {
  it('Recuperando lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await salesModel.listSales();

    expect(result).to.be.equal(allSales);
  });

  it('Recuperando venda pelo Id', async function () {
    sinon.stub(connection, 'execute').resolves([saleId2]);
    const result = await salesModel.listById(2);

    expect(result).to.deep.equal(saleId2);
  });

  it('É possível cadastrar vendas com sucesso', async function () {
    const callback = sinon.stub(connection, 'execute');
    callback.onCall(0).resolves([insertSalesReturn]);
    callback.onCall(1).resolves([{ affectedRows: 1 }]);
    callback.onCall(2).resolves([[{
      productId: 2,
      quantity: 1,
    }]]);

    const result = await salesModel.createSale(newSale);

    expect(result).to.be.deep.equal(returnFromCreateSale);
  });

  it('É possivel deletear uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await salesModel.deleteSale(2);

    expect(result).to.be.equal(1);
  });

  it('É possivel alterar a quantidade de um produto de uma venda com sucesso', async function () {
    const callback = sinon.stub(connection, 'execute');
    callback.onCall(0).resolves([{ affectedRows: 1 }]);
    callback.onCall(1).resolves([updatedQuantityDate]);

    const result = await salesModel.updateQuantity(2, 3, 50);

    expect(result).to.be.equal(updatedQuantityDate);
  });

  afterEach(function () {
    sinon.restore();
  });
});