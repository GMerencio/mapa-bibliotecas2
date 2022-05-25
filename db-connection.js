/* Script de conexão com o banco de dados. */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { MongoClient } = require('mongodb');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.vnpiw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGODB_URI);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db(process.env.MONGODB_DATABASE)
      					.collection(process.env.MONGODB_COLLECTION);
      console.log('Conectou com sucesso ao MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};