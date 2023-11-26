const executeQuery = require('../../../db/dbManager');
const {errorHandler} = require('../../../helpers/errorHandler');



const createDevices = async (event, context) => {
  try {
    if (!event.body) {
      return errorHandler({statusCode: 400, mesage: 'Body missing'})
    };

    // deviceValidator

    const {lol} = JSON.parse(event.body);

    await executeQuery(CREATE_DEVICE, []);

    return {
      statusCode: 201,
      body: 'Device created'
    }
    
  } catch (error) {
    return errorHandler(error);
  }
};

module.exports = { createDevices };

// todo: continue devices