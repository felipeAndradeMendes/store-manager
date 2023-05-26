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

module.exports = {
  listSales,
  listById,
};