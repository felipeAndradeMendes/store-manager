const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { products, product2 } = require('./mocks/products.controller.mocks');

const PRODUCT_NOT_FOUND_MSG_ERROR = { message: 'Product not found' };

describe('Testes de unidade do Controller de Products', function () {
  it('Recupera lista de produtos com sucesso', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'listProducts')
      .resolves(products);

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Lista um produto especifico com sucesso', async function () {
    const res = {};
    const req = {
      params: { id: 2 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon 
      .stub(productsService, 'listById')
      .resolves({ type: null, message: product2 });

    await productsController.listById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product2);
  });

  it('Não é possivel listar um produto que não existe', async function () {
    const req = {
      params: { id: 999 },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'listById')
      .resolves({ 
        type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND_MSG_ERROR,
      });

    await productsController.listById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(PRODUCT_NOT_FOUND_MSG_ERROR);
  });

  it('Não é possivel atualizar um produto que não existe', async function () {
    const req = {
      params: { id: 999 },
      body: { name: 'Capa do Bátma' },
    };
    // const { id } = req.params;
    // const { name } = req.body;
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves({ 
        type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' },
      });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('É possível deletar um produto com sucesso', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();
    sinon
      .stub(productsService, 'deleteProduct')
      .resolves(true);
    
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Não é possível deletar um produto que não existe', async function () {
    const res = {};
    const req = {
      params: { id: 999 },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const end = sinon.stub().returns();
    sinon
      .stub(productsService, 'deleteProduct')
      .resolves({ 
        type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND_MSG_ERROR, 
      });
    
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(end).to.have.been.not.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});