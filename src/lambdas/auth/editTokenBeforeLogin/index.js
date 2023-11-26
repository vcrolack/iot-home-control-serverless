const AWS = require("aws-sdk");
const executeQuery = require("../../../db/dbManager");
const { errorHandler } = require("../../../helpers/errorHandler");

const editTokenBeforeLogin = async (event, context) => {
  const username = event.userName;

  try {
    const idAutoincremental = await executeQuery(
      `SELECT "ID" FROM "Usuarios" WHERE "CognitoUserId"=$1`,
      [username]
    );

    if ( idAutoincremental && idAutoincremental.length > 0 ) {
      const id = String(idAutoincremental[0].ID);

      event.response = {
        claimsOverrideDetails: {
          claimsToAddOrOverride: {
            "custom:user_id": id,
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
