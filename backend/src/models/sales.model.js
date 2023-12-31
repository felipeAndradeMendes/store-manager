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

const createSale = async (newSale) => {
  const [sales] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
    );
  const newSalesPromisse = newSale.map((sale) => {
    const result = connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [sales.insertId, sale.productId, sale.quantity],
    ); 
    return result;
  });

  await Promise.all(newSalesPromisse);

  return {
    id: sales.insertId,
    itemsSold: newSale,
  };
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  // console.log(affectedRows);
  return affectedRows;
};

const updateQuantity = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
  'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
  [quantity, saleId, productId],
  );

  const [date] = await connection.execute(
    'SELECT date FROM sales WHERE id = ?',
    [saleId],
  );
  // console.log('DATE:', date);
  console.log('UPDATE QUANTITY RESULT:', affectedRows);
  return date;
};

module.exports = {
  listSales,
  listById,
  createSale,
  deleteSale,
  updateQuantity,
};