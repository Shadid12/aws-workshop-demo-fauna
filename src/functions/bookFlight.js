'use strict';

module.exports.handler = async (event, context) => {
  console.log('bookFlight', JSON.stringify(event, null, 2));
  if (event.flightId === -1) {
    throw new Error('Flight cannot be booked');
  }
  return {
    statusCode: 200
  };
};
