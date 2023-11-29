const AWS = require("aws-sdk");
const { config } = require("../../../../config/config");
const { errorHandler } = require("../../../helpers/errorHandler");
const { loginValidator } = require("../../../helpers/validators");
const { GET_USER_BY_EMAIL } = require("../../../queries/userQueries");
const executeQuery = require("../../../db/dbManager");

const cognito = new AWS.CognitoIdentityServiceProvider();

const login = async (event, context) => {
  const loginBody = JSON.parse(event.body);

  const errorData = loginValidator(loginBody);
  if (errorData.length > 0)
    return errorHandler({ statusCode: 400, message: errorData });

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.cognitoClientId,
    AuthParameters: {
      USERNAME: loginBody.CorreoElectronico,
      PASSWORD: loginBody.Contrasena,
    },
  };

  try {
    const authResult = await cognito.initiateAuth(params).promise();
    const userDetails = await cognito
      .getUser({ AccessToken: authResult.AuthenticationResult.AccessToken })
      .promise();

    const userDb = await executeQuery(GET_USER_BY_EMAIL, [
      loginBody.CorreoElectronico,
    ]);
    const additionalUserInfo = userDb.length > 0 ? userDb[0] : {};

    const response = {
      userAttributes: userDetails.UserAttributes,
      additionalInfo: additionalUserInfo,
      tokens: {
        idToken: authResult.AuthenticationResult.IdToken,
        accessToken: authResult.AuthenticationResult.AccessToken,
      }
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = { login };
