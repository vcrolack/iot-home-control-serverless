const { adminTest } = require('../../../../config/roles');
const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { verifyRole } = require('../../../helpers/verifyRole');
const { GET_USERS } = require("../../../queries/userQueries");

const getUsers = async (event, context) => {
  try {

    if (!event.headers.Authorization) return errorHandler({statusCode: 400, message: 'Headers are required'});

    const decodedToken = verifyRole(event.headers.Authorization, adminTest);
    if (decodedToken.statusCode) return decodedToken;

    const result = await executeQuery(GET_USERS);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }

  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  getUsers
};