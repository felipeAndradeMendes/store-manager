const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const {
  returnedSalesList, 
  saleId1, 
  returnUpdatedQuantityObj,
} = require('./mocks/sales.controller.mocks');

const SALE_NOT_FOUND_ERROR_MSG = 'Sale not found';

describe('Testes de unidade do Controller de Sales', function () {
  it('Lista com sucesso todas as vendas', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon 
      .stub(salesService, 'listSales')
      .resolves(returnedSalesList);

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnedSalesList);
  });

  it('Lista uma venda a partir do seu ID', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'listById')
      .resolves({ type: null, message: saleId1 });

    await salesController.listById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleId1);
  });

  it('Não é possivel listar uma venda que não exista', async function () {
    const res = {};
    const req = {
      params: { id: 999 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'listById')
      .resolves({ type: 'SALES_NOT_FOUD', message: SALE_NOT_FOUND_ERROR_MSG });

    await salesController.listById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: SALE_NOT_FOUND_ERROR_MSG });
  });

  it('Deleta uma venda com sucesso', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    sinon
      .stub(salesService, 'deleteSale')
      .resolves(true);

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Não é possivel deletar uma venda que não existe', async function () {
    const res = {};
    const req = {
      params: {
        id: 999,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();
    sinon
      .stub(salesService, 'deleteSale')
      .resolves({ 
          type: 'SALE_NOT_FOUND', message: { message: SALE_NOT_FOUND_ERROR_MSG }, 
        });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: SALE_NOT_FOUND_ERROR_MSG });
    expect(res.end).to.have.been.not.calledWith();
  });

  it('É possivel atualizar a quantidade de um produto com sucesso', async function () {
    const res = {};
    const req = {
      params: { 
        saleId: 1,
        productId: 2,
      },
      body: {
        quantity: 50,
      },   
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'updateQuantity')
      .resolves(returnUpdatedQuantityObj);

    await salesController.updateQuantity(req, res);

    expect(res.status).to.have.been.called.calledWith(200);
    expect(res.json).to.have.been.called.calledWith(returnUpdatedQuantityObj);
  });

  // it('Não é possivel atualizar a quantidade uma venda que não exista', async function () {
  //   const res = {};
  //   const req = {
  //     params: { 
  //       saleId: 999,
  //       productId: 2,
  //     },
  //     body: {
  //       quantity: 50,
  //     },   
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon
  //     .stub(salesService, 'updateQuantity')
  //     .resolves({ 
  //       type: 'SALE_NOT_FOUND', 
  //       message: { message: SALE_NOT_FOUND_ERROR_MSG },
  //     });

  //   await salesController.updateQuantity(req, res);

  //   expect(res.status).to.have.been.called.calledWith(400);
  //   expect(res.json).to.have.been.called.calledWith({ message: SALE_NOT_FOUND_ERROR_MSG });
  // });

  // it('Não é possivel atualizar a quantidade de um produto que não exista', async function () {
  //   const res = {};
  //   const req = {
  //     params: { 
  //       saleId: 1,
  //       productId: 999,
  //     },
  //     body: {
  //       quantity: 50,
  //     },   
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon
  //     .stub(salesService, 'updateQuantity')
  //     .resolves({ 
  //       type: 'PRODUCT_NOT_FOUND_IN_SALE', 
  //       message: 'Product not found in sale',
  //     });

  //   await salesController.updateQuantity(req, res);

  //   expect(res.status).to.have.been.called.calledWith(400);
  //   expect(res.json).to.have.been.called.calledWith('Product not found in sale');
  // });

  // ESTUDAR COMO TESTAR AS LINHAS DE 'CATCH' DO TRY/CATCH
  // it.only('testa quando função da erro', async function () {
  //   const res = {};
  //   const req = {
  //     params: { id: 1 },
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon
  //     .stub(salesController, 'deleteSale')
  //     .resolves(undefined);

  //   await salesController.deleteSale(req, res);

  //   expect(res.status).to.have.been.calledWith(500);
  //   expect(res.json).to.have.been.calledWith('algum erro');
  // });

  afterEach(function () {
    sinon.restore();
  });
});