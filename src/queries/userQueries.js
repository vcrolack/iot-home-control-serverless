const GET_USERS = `SELECT * FROM "Usuarios"`;

const GET_USER_BY_ID = `SELECT * FROM "Usuarios" WHERE "ID" = $1`;

const CREATE_USER = `
`;

const UPDATE_USER = `
  UPDATE "Usuarios" SET "NombreUsuario" = $1, 
  "CorreoElectronico" = $2, 
  "Ubicacion" = $3,
  "ConfiguracionNotificacion" = $4, 
  "CognitoUserId" = $5
  WHERE "ID" = $6
`;

const DELETE_USER = '';

module.exports = {
  GET_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
};