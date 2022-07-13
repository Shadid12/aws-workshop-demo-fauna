'use strict';

module.exports.handler = async (event, context) => {
  console.log('bookHotel', JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    flightId: event.flightId
  };
};
