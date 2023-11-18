const AWS = require('aws-sdk');
const { errorHandler } = require('../../../helpers/errorHandler');
const { validateEmail } = require('../../../helpers/validators');
const { config } = require('../../../../config/config');

const cognito = new AWS.CognitoIdentityServiceProvider();


const confirmSignUp = async (event, context) => {
  const { CorreoElectronico, code } = JSON.parse(event.body);

  const errorEmail = validateEmail(CorreoElectronico);
  if (errorEmail.length > 0) return errorHandler(errorEmail);
  
  const params = {
    ClientId: config.cognitoClientId,
    Username: CorreoElectronico,
    ConfirmationCode: code,
  };

  try {
    await cognito.confirmSignUp(params).promise();
    return {
      statusCode: 200,
      body: 'User confirmed successfully',
    }
  } catch (error) {
    return errorHandler(error);
  }


};

module.exports = {
  confirmSignUp
};