const AWS = require('aws-sdk');
const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { config } = require('../../../../config/config');
const { userValidator } = require('../../../helpers/validators');
const { CREATE_USER } = require('../../../queries/userQueries');

const cognito = new AWS.CognitoIdentityServiceProvider();

const register = async (event, context) => {

  if (!event.body) {
    return errorHandler({statusCode: 400, message: 'Body without necessary information'});
  }

  const userBody = JSON.parse(event.body);
  userBody.CorreoElectronico = userBody.CorreoElectronico.toLowerCase();

  const errors = userValidator(userBody);

  if (errors.length > 0) return errorHandler({statusCode: 400, message: errors});

  const params = {
    ClientId: config.cognitoClientId,
    Username: userBody.CorreoElectronico,
    Password: userBody.Contrasena,
    UserAttributes: [
      {
        Name: 'email',
        Value: userBody.CorreoElectronico
      },
    ]
  }

  try {
    const signUpResponse = await cognito.signUp(params).promise();
    const cognitoUserId = signUpResponse.UserSub;

    const createUser = await executeQuery(CREATE_USER, [
      userBody.NombreUsuario,
      userBody.CorreoElectronico,
      userBody.Ubicacion,
      '123456asdasdas',
      userBody.ConfiguracionNotificacion,
      cognitoUserId
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(createUser)
    }
  } catch (error) {
      return errorHandler(error);
  }

};

module.exports = {
  register
};