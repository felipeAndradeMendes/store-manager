const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/db/connection');
const { products, newProduct } = require('./mocks/products.model.mocks');

describe('Testes de unidade do Model de Products', function () {
  it('Recuperando lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.listProducts();

    expect(result).to.be.equal(products);
  });

  it('Recuperando produto pelo Id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productsModel.listById(1);

    expect(result).to.deep.equal(products[0]);
  });

  it('É possivel cadastrar um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productsModel.createProduct(newProduct);

    expect(result).to.be.equal(4);
  });

  it('É possivel atualizar um rpduto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves();
  });

  afterEach(function () {
    sinon.restore();
  });
});