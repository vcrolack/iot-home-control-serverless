const executeQuery = require('../../../db/dbManager');
const errorHandler = require('../../../helpers/errorHandler');
const { GET_USERS } = require("../../../queries/userQueries");

const getUsers = async (event, context) => {
  try {
    const result = await executeQuery(GET_USERS);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    }

  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  getUsers
};