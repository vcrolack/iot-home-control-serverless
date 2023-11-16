const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");
const { UPDATE_PANTRY, GET_PANTRY_BY_ID } = require("../../../queries/pantryQueries");


const updatePantries = async (event, context) => {
  try {
    const { id } = event.pathParameters;
    const pantryBody = JSON.parse(event.body);

    const currentData = await executeQuery(GET_PANTRY_BY_ID, [parseInt(id)]);

    

    if (currentData.length === 0) {
      return errorHandler({ message: "Pantry not found", statusCode: 404 });
    }

    const currentPantry = currentData[0];

    const toUpdate = {
      NombreItem: pantryBody.NombreItem ?? currentPantry.NombreItem,
      FechaCompra: pantryBody.FechaCompra ?? currentPantry.FechaCompra,
      FechaCaducidad: pantryBody.FechaCaducidad ?? currentPantry.FechaCaducidad,
      CantidadDisponible: pantryBody.CantidadDisponible ?? currentPantry.CantidadDisponible,
      UnidadesMedida: pantryBody.UnidadesMedida ?? currentPantry.UnidadesMedida,
      PropietarioID: pantryBody.PropietarioID ?? currentPantry.PropietarioID,
    };
    

    await executeQuery(
      UPDATE_PANTRY,
      [
        toUpdate.NombreItem,
        toUpdate.FechaCompra,
        toUpdate.FechaCaducidad,
        toUpdate.CantidadDisponible,
        toUpdate.UnidadesMedida,
        toUpdate.PropietarioID,
        parseInt(id)
      ]
    );

    return {
      statusCode: 200,
      body: "Pantry updated",
    }


  } catch(error) {
    return errorHandler(error);
  }
};

module.exports = { updatePantries };
