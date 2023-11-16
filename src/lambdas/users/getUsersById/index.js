const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");
const { GET_USER_BY_ID } = require("../../../queries/userQueries");



const getUsersById = async (event, context) => {
  try {
    const { id } = event.pathParameters;

    const result = await executeQuery(GET_USER_BY_ID, [parseInt(id)]);

    if (result.length === 0) {
      return errorHandler({statusCode: 404, message: 'User not found'})
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }

  } catch (error) {
    return errorHandler(error);
  }
};


module.exports = {
  getUsersById
};
