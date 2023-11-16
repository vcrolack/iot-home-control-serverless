require('dotenv').config();

const config = {
  dbSecretKey: process.env.DB_SECRET_NAME,
};

module.exports = { config };