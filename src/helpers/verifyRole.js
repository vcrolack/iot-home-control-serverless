const jwt = require('jsonwebtoken');
const {errorHandler} = require('./errorHandler');

const verifyRole = (authHeader, role) =>  {

  const token = authHeader.split(' ')[1];
  const decodedToken = jwt.decode(token);

  if (!decodedToken['cognito:groups'] || !decodedToken['cognito:groups'].includes(role)) {
    return errorHandler({statusCode: 401, message: 'Resource unauthorized'});
  }

  return decodedToken;
};

module.exports = {verifyRole};