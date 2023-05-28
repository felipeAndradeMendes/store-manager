const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { product1, newProduct, products } = require('./mocks/products.service.mocks');
const { productsService } = require('../../../src/services');

describe('Testes de unidade do Service Products', function () {
  it('Lista todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'listProducts').resolves(products);
    const result = await productsService.listProducts();

    expect(result).to.be.deep.equal(products);
  });

  it('Lista com sucesso produto por ID', async function () {
    sinon.stub(productsModel, 'listById').resolves(product1);
    const result = await productsService.listById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(product1);
  });

  it('Não permite listar um produto que não existe', async function () {
    sinon.stub(productsModel, 'listById').resolves(undefined);
    const result = await productsService.listById(99999);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Retorna status e json corretos ao cadastrar um produto', async function () {
    sinon.stub(productsModel, 'createProduct').resolves(4);
    const result = await productsService.createProduct(newProduct);

    expect(result).to.be.equal(4);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});