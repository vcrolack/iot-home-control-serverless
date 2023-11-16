const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { GET_PANTRY_BY_ID, DELETE_PANTRY } = require('../../../queries/pantryQueries');

const deletePantries = async (event, context) => {
  try {
    const { id } = event.pathParameters;

    const pantry = await executeQuery(GET_PANTRY_BY_ID, [parseInt(id)]);
  
    if (pantry.length === 0) {
      return errorHandler({ message: "Pantry not found", statusCode: 404 });
    }
  
    await executeQuery(DELETE_PANTRY, [parseInt(id)]);
  
    return {
      statusCode: 200,
      body: "Pantry deleted",
    }

  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  deletePantries
};