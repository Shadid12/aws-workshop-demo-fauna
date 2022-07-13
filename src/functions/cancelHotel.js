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
  // Fake a delay for external API call
  // await new Promise(resolve => setTimeout(resolve, 10000));

  try {
    await serverClient.query(
      q.Update(
        q.Ref(q.Collection('Vacation'), JSON.parse(event.Cause).errorMessage),
        { 
          data: {
            status: 'cancelled',
          }
        },
      )
    )
    return { statusCode: 200 };
  } catch (error) {
    throw new Error(error);
  }
};
