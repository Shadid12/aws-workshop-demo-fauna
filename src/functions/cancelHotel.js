'use strict';

module.exports.handler = async (event, context) => {
  console.log('cancelHotel Reservation', JSON.stringify(event, null, 2));
  return {
    statusCode: 200
  };
};
