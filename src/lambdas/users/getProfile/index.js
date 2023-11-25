const jwt = require('jsonwebtoken');
const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { GET_PROFILE } = require('../../../queries/userQueries');

const getProfile = async (event, context) => {
  try {
    const { cognitoUserId } = event.pathParameters;

    if (!event.headers.Authorization) return errorHandler({statusCode: 400, message: 'Bad request'});

    const token = event.headers.Authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);

    if (!decodedToken || decodedToken.sub !== cognitoUserId) return errorHandler({statusCode: 403, message: 'Unauthorized'});

    const user = await executeQuery(GET_PROFILE, [cognitoUserId]);

    if (!user) return errorHandler({statusCode: 404, message: 'User not found'});

    return {
      statusCode: 200,
      body: JSON.stringify(user)
    };
  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = {
  getProfile
};