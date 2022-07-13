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

  // Fake a delay for external API call
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (event.flightId === -1) {
    throw new Error(event.reservation.id);
  }

  try {
    const updateBooking = await serverClient.query(
      q.Update(
        q.Ref(q.Collection('Vacation'), event.reservation.id),
        { 
          data: {
            status: 'confirmed',
            flightStatus: 'confirmed',
          }
        },
      )
    )
    return {
      updateBooking,
      statusCode: 200
    };
  } catch (error) {
    throw new Error(error);
  }
};
