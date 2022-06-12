/* Script de conexão com o banco de dados. */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { MongoClient } = require('mongodb');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.vnpiw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGODB_URI);

let dbConnection;

module.exports = {
  connectToServer: async function (callback) {
  	try {
  		await client.connect();
  		let db = await client.db(process.env.MONGODB_DATABASE);
  		dbConnection = await db.collection(process.env.MONGODB_COLLECTION);
  		console.log('Conectou com sucesso ao MongoDB.');
	  	callback();
  	} catch (err) {
  		return callback(err);
  	}
  },

  getDb: function () {
    return dbConnection;
  },
  
  closeDb: async function() {
  	await client.close();
  	console.log("Conexão com o MongoDB encerrada com sucesso");
  }
};