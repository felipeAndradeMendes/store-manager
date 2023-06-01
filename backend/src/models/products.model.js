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
  // console.log(result);
  return result;
};

const listByIdInSales = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM sales_products WHERE product_id = ?',
    [id],
  );
  return result;
};

const createProduct = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [newProduct.name],
  );
  // console.log(insertId);
  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return affectedRows;
  // return { id: Number(id), name };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  // console.log(result);
  return affectedRows;
};

const searchProductByName = async (q) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [`%${q}%`],
  );

  console.log('SQL FILTER RESULT:', result);
  return result;
};

module.exports = {
  listProducts,
  listById,
  createProduct,
  updateProduct,
  deleteProduct,
  listByIdInSales,
  searchProductByName,
};
