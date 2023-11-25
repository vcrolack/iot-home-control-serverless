const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { GET_USER_BY_ID } = require('../../../queries/userQueries');
const {verifyRole} = require('../../../helpers/verifyRole');
const { adminTest } = require('../../../../config/roles');

const getUsersById = async (event, context) => {
  try {
    const { id } = event.pathParameters;
    
    if (!event.headers.Authorization) return errorHandler({statusCode: 400, message: 'Bad request'});

    const decodedToken = verifyRole(event.headers.Authorization, adminTest);
    if (decodedToken.statusCode) return decodedToken;

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
