const GET_USERS = `SELECT * FROM "Usuarios"`;

const GET_USER_BY_ID = `SELECT * FROM "Usuarios" WHERE "ID" = $1`;

const CREATE_USER = `
  INSERT INTO "Usuarios" ("NombreUsuario", "CorreoElectronico", "Ubicacion", "Contrasena", "ConfiguracionNotificacion", "CognitoUserId") 
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING "ID"
`;

const UPDATE_USER = `
  UPDATE "Usuarios" SET "NombreUsuario" = $1, 
  "CorreoElectronico" = $2, 
  "Ubicacion" = $3,
  "ConfiguracionNotificacion" = $4, 
  "CognitoUserId" = $5
  WHERE "ID" = $6
`;

const DELETE_USER = 'DELETE FROM "Usuarios" WHERE "ID" = $1';

module.exports = {
  GET_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
};