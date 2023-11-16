
const GET_PANTRIES = `SELECT * FROM "Despensa"`;
const GET_PANTRY_BY_ID = 'SELECT * FROM Despensa WHERE id = $1';
const ADD_PANTRY = 'INSERT INTO Despensa (nombre) VALUES ($1)';
const UPDATE_PANTRY = 'UPDATE Despensa SET nombre = $1 WHERE id = $2';
const DELETE_PANTRY = 'DELETE FROM Despensa WHERE id = $1';

module.exports = { 
  GET_PANTRIES, 
  GET_PANTRY_BY_ID, 
  ADD_PANTRY,
  UPDATE_PANTRY, 
  DELETE_PANTRY 
};