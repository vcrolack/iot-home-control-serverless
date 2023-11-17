require('dotenv').config();

const config = {
  dbSecretKey: process.env.DB_SECRET_NAME,
  cognitoClientId: process.env.COGNITO_CLIENT_ID,
};

module.exports = { config };