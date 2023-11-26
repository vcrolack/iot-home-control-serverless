const { Pool } = require('pg');
const { config } = require('../../config/config');
const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

let cachedPool = null;

const getSecret = async (secretName) => {
  const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

  return JSON.parse(data.SecretString);
};

const createPool = async () => {
  if (cachedPool) return cachedPool;

  const secret = await getSecret(config.dbSecretKey);
  
  cachedPool = new Pool({
    user: secret.username,
    host: secret.host,
    database: secret.dbname,
    password: secret.password,
    port: secret.port,
    ssl: {
      rejectUnauthorized: false
    }
  });

  return cachedPool;
};

module.exports = createPool;
