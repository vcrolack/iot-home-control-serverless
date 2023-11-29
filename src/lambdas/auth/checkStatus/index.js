const AWS = require('aws-sdk');
const { errorHandler } = require('../../../helpers/errorHandler');

const cognito = new AWS.CognitoIdentityServiceProvider();

const checkStatus = async (event, context) => {
  if (!event.headers.Authorization) return errorHandler({statusCode: 400, message: 'Invalid headers'});
  const token = event.headers.Authorization.split(' ')[1];


  try {
    await cognito.getUser({AccessToken: token}).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({isValid: true})
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 201,
      body: JSON.stringify({isValid: false})
    }
  }
};

module.exports = {checkStatus};