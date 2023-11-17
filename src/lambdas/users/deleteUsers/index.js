const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { GET_USER_BY_ID, DELETE_USER } = require('../../../queries/userQueries');

const deleteUsers = async (event, context) => {
  try {
    const { id } = event.pathParameters;
    const user = await executeQuery(GET_USER_BY_ID, [parseInt(id)]);

    if (user.length === 0) {
      return errorHandler({ message: "User not found", statusCode: 404 });
    }

    await executeQuery(DELETE_USER, [parseInt(id)]);

    return {
      statusCode: 200,
      body: "User deleted"
    }

  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  deleteUsers
};