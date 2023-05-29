const connection = require('../db/connection');

const listSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
    sp.sale_id AS saleId,
      sa.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
  FROM
    sales_products AS sp
      INNER JOIN
    sales AS sa ON sp.sale_id = sa.id;`,
  );
  // console.log(result);
  return result;
};

const listById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    sa.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
  FROM
    sales_products AS sp
      INNER JOIN
    sales AS sa ON sp.sale_id = sa.id
    WHERE sa.id = ?;`,
    [id],
  );
  // console.log(result);
  return result;
};

const getCreatedSales = async (salesId) => {
  const [response] = await connection.execute(
    `SELECT  product_id AS productId, quantity AS quantity FROM
    sales_products 
    WHERE sale_id = ?;`,
    [salesId],
  );
  console.log('RESPONSE:', response);
  return response;
};

const createSale = async (newSale) => {
  const [sales] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
    );
  console.log('SALES:', sales.insertId);

  const newSalesPromisse = newSale.map(async (sale) => {
    await connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [sales.insertId, sale.productId, sale.quantity],
    ); 
  });
  await Promise.all(newSalesPromisse);
  const response = await getCreatedSales(sales.insertId);

  return {
    id: sales.insertId,
    itemsSold: response,
  };
};

/* Não acabei a função de criar sales. 
Está adicionando corretamente no BD, mas a response ainda tem que ser tratada.
No console.log esta voltando somente um objeto, em vez de dois.
A query chama todos que tem o id igual a da tabela sale, então tem que ver como voltar direito.
***Ver aula sobre Promisse.all, acho que está aí a explicação */ 

module.exports = {
  listSales,
  listById,
  createSale,
};