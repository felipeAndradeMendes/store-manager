const express = require('express');
const { productRouter, salesRouter } = require('./routers');
// require('dotenv').config();

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;

// Parei implementado req 10. Acho que é necessário preparar para acesso externo, com o arquivo .env.
