
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client =  null;
// console.log(process.env.MONGODB_URI)

function createConnection(){
    client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log("mongodb connection established...")
}

createConnection();


function getConnection(){
  return client ;
}


module.exports = {
  getConnection,
}
