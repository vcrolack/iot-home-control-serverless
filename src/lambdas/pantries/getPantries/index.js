const {GET_PANTRIES} = require('../../../queries/pantryQueries');
const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { verifyRole } = require('../../../helpers/verifyRole');
const { adminTest } = require('../../../../config/roles');


const getPantries = async (event, context) => {
  try {

    if (!event.headers.Authorization) return errorHandler({statusCode: 401, message: 'Resource unauthorized'});

    const decodedToken = verifyRole(event.headers.Authorization, adminTest);
    if (decodedToken.statusCode) return decodedToken;

    const result = await executeQuery(GET_PANTRIES);
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };

  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  getPantries,
};