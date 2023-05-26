const connection = require('../db/connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );
  // console.log(result);
  return result;
};

const listById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  console.log(result);
  return result;
};

module.exports = {
  listProducts,
  listById,
};