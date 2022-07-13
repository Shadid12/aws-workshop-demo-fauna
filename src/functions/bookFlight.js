'use strict';

// import faunadb driver
const faunadb = require('faunadb')
const q = faunadb.query;

// initialize fauna client
const serverClient = new faunadb.Client({ 
  secret: process.env.FAUNA_ROOT_KEY,
  domain: process.env.FAUNA_DOMAIN,
});

module.exports.handler = async (event, context) => {
  console.log('bookFlight', JSON.stringify(event, null, 2));

  if (event.flightId === -1) {
    throw new Error('Flight cannot be booked');
  }
  return {
    statusCode: 200
  };
};
