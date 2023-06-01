const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { saleId2, 
  salesList, 
  returnFromSales, 
  newSale, 
  returnedIdFromCreateSales, 
  returnFromValidateId,
  updatedQuantityDate,
  returnUpdatedQuantityObj,
} = require('./mocks/sales.service.mock');
const { salesService } = require('../../../src/services');

describe('Testes de unidade do Service Sales', function () {
  it('Lista com sucesso todas as vendas', async function () {
    sinon.stub(salesModel, 'listSales').resolves(salesList);
    const result = await salesModel.listSales();

    expect(result).to.be.deep.equal(salesList);
  });

  it('Nao lista vendas caso parametro esteja incorreto', async function () {
    sinon.stub(salesModel, 'listSales').resolves(undefined);
    const result = await salesModel.listSales();

    expect(result).to.be.deep.equal(undefined);
  });

  it('Lista com sucesso vendas por ID', async function () {
    sinon.stub(salesModel, 'listById').resolves(saleId2);
    const result = await salesService.listById(2);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(saleId2);
  });

  it('Não permite listar uma venda que não existe', async function () {
    sinon.stub(salesModel, 'listById').resolves([]);
    const result = await salesService.listById(99999);

    expect(result.type).to.be.equal('SALES_NOT_FOUD');
    expect(result.message).to.be.deep.equal('Sale not found');
  });

  it('É possivel cadastrar vendas com sucesso', async function () {
    sinon.stub(salesModel, 'createSale').resolves(returnFromSales);
    sinon.stub(productsModel, 'listById').resolves(returnedIdFromCreateSales);
    const result = await salesService.createSale(newSale);

    expect(result).to.be.deep.equal(returnFromSales);
  });

  it('Não é possivel cadastrar vendas de um produto que não existe', async function () {
    sinon.stub(productsModel, 'listById').resolves(undefined);
    const result = await salesService.createSale(newSale);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });

  it('É possivel deletar vendas com sucesso', async function () {
    sinon.stub(salesModel, 'listById').resolves(returnFromValidateId);
    sinon.stub(salesModel, 'deleteSale').resolves(1);
    const result = await salesService.deleteSale(1);

    expect(result).to.be.equal(1);
  });

  it('Não é possivel deletar uma venda que não existe', async function () {
    sinon.stub(salesModel, 'listById').resolves([]);
    const result = await salesService.deleteSale(999);

    expect(result.type).to.be.equal('SALE_NOT_FOUND');
    expect(result.message).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('É possivel atualizar a quantidade de um produto com sucesso', async function () {
    sinon.stub(salesModel, 'listById').resolves(true);
    sinon.stub(productsModel, 'listByIdInSales').resolves(true);
    sinon.stub(salesModel, 'updateQuantity').resolves(updatedQuantityDate);
    
    const result = await salesService.updateQuantity(2, 3, 50);

    expect(result).to.be.deep.equal(returnUpdatedQuantityObj);
  });

  it('Não é possivel atualizar a quantidade uma venda que não exista', async function () {
    sinon.stub(salesModel, 'listById').resolves([]);
    sinon.stub(productsModel, 'listByIdInSales').resolves(true);
    const result = await salesService.updateQuantity(999, 3, 50);

    expect(result.type).to.be.equal('SALE_NOT_FOUND');
    expect(result.message).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Não é possivel atualizar a quantidade de um produto que não exista', async function () {
    sinon.stub(salesModel, 'listById').resolves(true);
    sinon.stub(productsModel, 'listByIdInSales').resolves(false);
    const result = await salesService.updateQuantity(1, 999, 50);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND_IN_SALE');
    expect(result.message).to.be.deep.equal({ message: 'Product not found in sale' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});