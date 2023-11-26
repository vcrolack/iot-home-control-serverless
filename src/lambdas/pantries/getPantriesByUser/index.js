const jwt = require("jsonwebtoken");
const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");
const { GET_PANTRIES_BY_USER } = require("../../../queries/pantryQueries");

const getPantriesByUser = async (event, context) => {
  try {
    const { id } = event.pathParameters;

    if (!event.headers.Authorization)
      return errorHandler({ statusCode: 400, message: "Bad request" });

    const token = event.headers.Authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      return errorHandler({ statusCode: 401, message: "Invalid token" });
    }
  
    if (parseInt(decodedToken.user_id) !== parseInt(id))
      return errorHandler({ statusCode: 403, message: "Unauthorized" });

    const result = await executeQuery(GET_PANTRIES_BY_USER, [id]);

    if (result.length === 0)
      return errorHandler({ statusCode: 404, message: "Pantries not found" });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = { getPantriesByUser };
