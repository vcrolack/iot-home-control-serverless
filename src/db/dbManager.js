const createPool = require("./dbConfig");

const executeQuery = async query => {
  const pool = await createPool();
  const client = await pool.connect();

  try {
    const dbResponse = await client.query(query);
    return dbResponse.rows;
  } catch (error) {
    throw new Error(`Error al ejecutar la consulta: ${error.message}`);
  } finally {
    client.release();
  }
};

module.exports = executeQuery;