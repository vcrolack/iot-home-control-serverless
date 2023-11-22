const AWS = require("aws-sdk");
const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");

const editTokenBeforeLogin = async (event, context) => {
  const username = event.userName;

  try {
    const idAutoincremental = await executeQuery(
      `SELECT "ID" FROM "Usuarios" WHERE "CorreoElectronico"=$1`,
      [username]
    );

    console.log(idAutoincremental);

    if ( idAutoincremental && idAutoincremental.length > 0 ) {
      const id = idAutoincremental[0].ID;

      event.response = {
        claimsOverrideDetails: {
          claimsToAddOrOverride: {
            user_id_autoincremental: String(id),
          },
        },
      };
    }

    return event;

  } catch (error) {
    console.log(error);
    throw error;
    //return errorHandler(error);
  }
};

module.exports = {
  editTokenBeforeLogin,
};
