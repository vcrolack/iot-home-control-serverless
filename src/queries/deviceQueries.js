const GET_DEVICES = `SELECT * FROM "Dispositivos"`;

const GET_DEVICE_BY_ID = `SELECT * FROM "Dispositivos WHERE "DeviceID" = $1`;

const CREATE_DEVICE = `INSERT INTO "Dispositivos" ()`;

const UPDATE_DEVICE = '';

const DELETE_DEVICE = '';

const GET_DEVICES_BY_USER = '';

const GET_DEVICE_BY_USER = '';

module.exports = {
  GET_DEVICES,
  GET_DEVICE_BY_ID,
  CREATE_DEVICE,
  UPDATE_DEVICE,
  DELETE_DEVICE,
  GET_DEVICES_BY_USER,
  GET_DEVICE_BY_ID
};