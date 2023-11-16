const executeQuery = require('../../../db/dbManager');
const { errorHandler } = require('../../../helpers/errorHandler');
const { CREATE_PANTRY } = require('../../../queries/pantryQueries');
const { pantryValidator} = require('../../../helpers/validators');

const createPantries = async (event, context) => {
  try {

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Body empty" }),
      }
    };

    pantryValidator(JSON.parse(event.body));

    const {
      NombreItem,
      FechaCompra,
      FechaCaducidad,
      CantidadDisponible,
      UnidadesMedida,
      PropietarioID
    } = JSON.parse(event.body);

    await executeQuery(
      CREATE_PANTRY, 
      [
        NombreItem, 
        FechaCompra, 
        FechaCaducidad, 
        CantidadDisponible, 
        UnidadesMedida, 
        PropietarioID
      ]
    );

    return {
      statusCode: 201,
      body: "Product created",
    };

  } catch (error) {
    return errorHandler(error);
  };
};


module.exports = {
  createPantries,
};

