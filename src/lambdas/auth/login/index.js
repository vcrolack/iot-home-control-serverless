const AWS = require('aws-sdk');
const { config } = require('../../../../config/config');
const { errorHandler } = require('../../../helpers/errorHandler');
const { loginValidator } = require('../../../helpers/validators');

const cognito = new AWS.CognitoIdentityServiceProvider();

const login = async (event, context) => {
  const loginBody = JSON.parse(event.body);

  const errorData = loginValidator(loginBody);
  if (errorData.length > 0) return errorHandler({statusCode: 400, message: errorData});

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: config.cognitoClientId,
    AuthParameters: {
      USERNAME: loginBody.CorreoElectronico,
      PASSWORD: loginBody.Contrasena
    }
  };

  try {
    const authResult = await cognito.initiateAuth(params).promise();

    const response = {
      idToken: authResult.AuthenticationResult.IdToken,
      accessToken: authResult.AuthenticationResult.AccessToken,
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };

  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = { login };
