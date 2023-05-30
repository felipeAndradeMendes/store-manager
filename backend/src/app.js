const express = require('express');
const { productRouter, salesRouter } = require('./routers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;

// parei antes de iniciar a implementação do requisito 09 - bonus
