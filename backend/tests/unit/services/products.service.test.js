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

  it('Não é possivel atualizar produto que não exista', async function () {
    sinon.stub(productsModel, 'listById').resolves(undefined);
    const result = await productsService.updateProduct({ id: 999, name: 'Capa do Bátma' });

    expect(result.type).to.be.deep.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal({ message: 'Product not found' });
  });

  it('É possivel deletar um produto com sucesso', async function () {
    sinon.stub(productsModel, 'listById').resolves(true);
    sinon.stub(productsModel, 'deleteProduct').resolves(1);

    const result = await productsService.deleteProduct(1);

    expect(result).to.be.equal(1);
  });

  it('Não é possível deletar um produto que não existe', async function () {
    sinon.stub(productsModel, 'listById').resolves(undefined);

    const result = await productsService.deleteProduct(1);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal({ message: 'Product not found' });
  });

  it('É possivel buscar um produto pelo nome', async function () {
    const query = 'tr';
    const returnedSearch = [{ id: 2, name: 'Traje de encolhimento' }];
    sinon.stub(productsModel, 'searchProductByName').resolves(returnedSearch);

    const result = await productsService.searchProduct(query);

    expect(result).to.be.deep.equal(returnedSearch);
  });

  it('Retorna todos os produtos quando a busca é vazia', async function () {
    const query = 'tr';
    sinon.stub(productsModel, 'searchProductByName').resolves(products);

    const result = await productsService.searchProduct(query);

    expect(result).to.be.deep.equal(products);
  });

  it('retorna um array vazio quando não há produtos correspondentes', async function () {
    const query = 'za';
    sinon.stub(productsModel, 'searchProductByName').resolves([]);

    const result = await productsService.searchProduct(query);

    expect(result).to.be.deep.equal([]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
