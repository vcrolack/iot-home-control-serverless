const jwt = require("jsonwebtoken");
const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");
const { GET_PANTRY_BY_USER } = require("../../../queries/pantryQueries");

const getPantryByUser = async (event, context) => {
  try {
    const { userId, id: pantryId } = event.pathParameters;

    if (!event.headers.Authorization)
      return errorHandler({ statusCode: 400, message: "Bad request" });

    const token = event.headers.Authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);

    if (!decodedToken)  
      return errorHandler({ statusCode: 401, message: "Invalid token" });

    if (parseInt(decodedToken["custom:user_id"]) !== parseInt(userId))
      return errorHandler({ statusCode: 403, message: "Unauthorized" });

    const result = await executeQuery(GET_PANTRY_BY_USER, [userId, pantryId]);

    if (result.length === 0)
      return errorHandler({ statusCode: 404, message: "Pantry not found" });

    if (result[0].PropietarioID !== parseInt(decodedToken["custom:user_id"]))
      return errorHandler({ statusCode: 403, message: "Unauthorized" });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  getPantryByUser,
};
