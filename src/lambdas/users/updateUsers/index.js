const executeQuery = require('../../../db/dbManager');
const { errorHandler} = require('../../../helpers/errorHandler');
const {GET_USER_BY_ID, UPDATE_USER} = require('../../../queries/userQueries');

const updateUsers = async (event, context) => {
  try {
    if (!event.pathParameters || !event.pathParameters.id) {
      return errorHandler(400, 'Missing info');
    }
  
    const { id } = event.pathParameters;
    const userBody = JSON.parse(event.body);
  
    const currentData = await executeQuery(GET_USER_BY_ID, [parseInt(id)]);
  
    if (currentData.length === 0) {
      return errorHandler({ message: "User not found", statusCode: 404 });
    }
  
    const currentUser = currentData[0];
  
    const toUpdate = {
      NombreUsuario: userBody.NombreUsuario ?? currentUser.NombreUsuario,
      CorreoElectronico: userBody.CorreoElectronico ?? currentUser.CorreoElectronico,
      Ubicacion: userBody.Ubicacion ?? currentUser.Ubicacion,
      ConfiguracionNotificacion: userBody.ConfiguracionNotificacion ?? currentUser.ConfiguracionNotificacion,
      CognitoUserId: currentUser.CognitoUserId,
      ID: parseInt(id),
    };
  
    await executeQuery(UPDATE_USER, Object.values(toUpdate));

    return {
      statusCode: 200,
      body: "User updated"
    };
  } catch(error) {
    return errorHandler(error);
  }
}

module.exports = { updateUsers };