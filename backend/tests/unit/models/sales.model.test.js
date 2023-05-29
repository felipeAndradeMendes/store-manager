const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/db/connection');
const { allSales, saleId2 } = require('./mocks/sales.model.mocks');

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
    sinon.stub(connection, 'execute').resolves();
    // estudar como fazer o stub de duas connection numa mesma função;
  });

  afterEach(function () {
    sinon.restore();
  });
});