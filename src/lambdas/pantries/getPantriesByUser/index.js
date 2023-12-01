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

    console.log('token decoded-> ' + JSON.stringify(decodedToken));
    console.log('id del token -> ' + decodedToken.user_id);
    console.log('id del path -> ' + id);

    if (parseInt(decodedToken['custom:user_id']) !== parseInt(id))
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
