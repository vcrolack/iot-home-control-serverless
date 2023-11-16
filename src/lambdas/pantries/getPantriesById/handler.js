const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");
const { GET_PANTRY_BY_ID } = require("../../../queries/pantryQueries");

const getPantriesById = async (event, context) => {
  try {
    const {id} = event.pathParameters;

    const result = await executeQuery(GET_PANTRY_BY_ID, [parseInt(id)]);
    
    if (result.length === 0) {
      return errorHandler({statusCode: 404, message: 'Pantry not found'})
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };

  } catch (error) {
    return errorHandler(error);
  };
};

module.exports =  {
  getPantriesById,
}