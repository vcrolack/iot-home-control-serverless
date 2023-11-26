const GET_PANTRIES = `SELECT * FROM "Despensa"`;

const GET_PANTRIES_BY_USER = `SELECT * FROM "Despensa" WHERE "PropietarioID" = $1`;

const GET_PANTRY_BY_ID = 'SELECT * FROM "Despensa" WHERE "ID" = $1';

const CREATE_PANTRY = `INSERT INTO "Despensa" ("NombreItem", "FechaCompra", "FechaCaducidad", "CantidadDisponible", "UnidadesMedida", "PropietarioID" ) 
                        VALUES ($1, $2, $3, $4, $5, $6)`;

const UPDATE_PANTRY = `  UPDATE "Despensa"
                          SET "NombreItem" = $1, 
                              "FechaCompra" = $2, 
                              "FechaCaducidad" = $3, 
                              "CantidadDisponible" = $4, 
                              "UnidadesMedida" = $5, 
                              "PropietarioID" = $6
                          WHERE "ID" = $7`;
                          
const DELETE_PANTRY = `DELETE FROM "Despensa" WHERE "ID" = $1`;

module.exports = {
  GET_PANTRIES,
  GET_PANTRIES_BY_USER,
  GET_PANTRY_BY_ID,
  CREATE_PANTRY,
  UPDATE_PANTRY,
  DELETE_PANTRY,
};
