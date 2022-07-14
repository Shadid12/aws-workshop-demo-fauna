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

  try {
    const newBooking = await serverClient.query(
      q.Create(
        q.Collection('Vacation'),
        { 
          data: {
            userId: event.userId,
            hotelBookingId: Math.random().toString(36).substring(2,12),
            status: 'pending',
          }
        },
      )
    );

    console.log('newBooking', JSON.stringify(newBooking));

    // Fake a delay for external API call
    await new Promise(resolve => setTimeout(resolve, 4000));
    const updateBooking = await serverClient.query(
      q.Update(
        q.Ref(q.Collection('Vacation'), newBooking['ref'].id),
        { 
          data: {
            status: 'confirmed',
          }
        },
      )
    )

    return {
      statusCode: 200,
      reservation: {
        id: newBooking['ref'].id,
        data: updateBooking.data
      },
      flightId: event.flightId
    };
  } catch (error) {
    throw new Error(error)
  }
};
