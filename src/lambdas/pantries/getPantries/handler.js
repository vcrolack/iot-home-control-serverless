const {GET_PANTRIES} = require('../../../queries/pantryQueries');
const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');


const getPantries = async (event, context) => {
  try {
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