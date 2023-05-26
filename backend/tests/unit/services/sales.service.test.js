const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { saleId2 } = require('./mocks/sales.service.mock');
const { salesService } = require('../../../src/services');

describe('Testes de unidade do Service Products', function () {
  it('Lista com sucesso produto por ID', async function () {
    sinon.stub(salesModel, 'listById').resolves(saleId2);
    const result = await salesService.listById(2);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(saleId2);
  });

  it('Não permite listar um produto que não existe', async function () {
    sinon.stub(salesModel, 'listById').resolves([]);
    const result = await salesService.listById(99999);

    expect(result.type).to.be.equal('SALES_NOT_FOUD');
    expect(result.message).to.be.deep.equal('Sale not found');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});