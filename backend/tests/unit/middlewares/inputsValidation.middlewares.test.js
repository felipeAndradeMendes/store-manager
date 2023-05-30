const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productValidation, salesValidation } = require('../../../src/middlewares/inputsValidation');
const { newSales,
   salesWithoutProductId,
   salesWithoutQuantity,
   salesQuantityZero,
   } = require('./mocks/inputsValidation.middleware.mocks');

const LENGTH_PRODUCT_ERROR_MSG = { message: '"name" length must be at least 5 characters long' };
const REQUIRED_PRODUCT_NAME_ERROR_MSG = { message: '"name" is required' };
const REQUIRED_SALES_PRODUCTID_ERROR_MSG = { message: '"productId" is required' };
const REQUIRED_SALES_QUANTITY_ERROR_MSG = { message: '"quantity" is required' };
const SALES_QUANTITY_ZERO_ERROR_MSG = { message: '"quantity" must be greater than or equal to 1' };

describe('Testes de unidade do Middleware Inputs Validation', function () {
  it('Products - Passa em todas as validações com sucesso', async function () {
    const res = {};
    const req = {
      body: {
        name: 'ProductX',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await productValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Products - não passa na validação com menos de 5 letras', async function () {
    const res = {};
    const req = {
      body: {
        name: 'Prod',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await productValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(LENGTH_PRODUCT_ERROR_MSG);
    expect(next).to.have.been.not.calledWith();
  });

  it('Products - não passa na validação sem campo "name"', async function () {
    const res = {};
    const req = {
      body: {},
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await productValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(REQUIRED_PRODUCT_NAME_ERROR_MSG);
    expect(next).to.have.been.not.calledWith();
  });

  it('Sales - passa em todas as validações com sucesso', async function () {
    const res = {};
    const req = {
      body: newSales,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await salesValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Sales - não passa na validação sem campo "productId"', async function () {
    const res = {};
    const req = {
      body: salesWithoutProductId,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await salesValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(REQUIRED_SALES_PRODUCTID_ERROR_MSG);
    expect(next).to.have.been.not.calledWith();
  });

  it('Sales - não passa na validação sem campo "quantity"', async function () {
    const res = {};
    const req = {
      body: salesWithoutQuantity,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await salesValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(REQUIRED_SALES_QUANTITY_ERROR_MSG);
    expect(next).to.have.been.not.calledWith();
  });

  it('Sales - não passa na validação com quantity menor que 1', async function () {
    const res = {};
    const req = {
      body: salesQuantityZero,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await salesValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(SALES_QUANTITY_ZERO_ERROR_MSG);
    expect(next).to.have.been.not.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});