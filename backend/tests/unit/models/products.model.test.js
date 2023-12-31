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

  it('É possivel atualizar um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModel.updateProduct({ id: 1, name: 'Capa do Bátima' });

    expect(result).to.be.equal(1);
  });

  it('É possivel deletar um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModel.deleteProduct(1);

    expect(result).to.be.equal(1);
  });

  it('É possivel buscar um produto pelo nome', async function () {
    const query = 'tr';
    const returnedSearch = [{ id: 2, name: 'Traje de encolhimento' }];
    sinon.stub(connection, 'execute').resolves([returnedSearch]);
    const result = await productsModel.searchProductByName(query);

    expect(result).to.be.deep.equal(returnedSearch);
  });

  it('Retorna todos os produtos quando a busca é vazia', async function () {
    const query = '';
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.searchProductByName(query);

    expect(result).to.be.deep.equal(products);
  });

  afterEach(function () {
    sinon.restore();
  });
});