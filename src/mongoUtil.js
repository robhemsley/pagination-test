/* @flow */
import { MongoClient } from 'mongodb';
import settings from './settings.js';
const dbName = 'pagination';

let _db;
let _client;

export const connectToServer = () =>
	MongoClient.connect(settings.mongoDbUrl, { useNewUrlParser: true }).then(
		client => {
			_client = client;
			_db = client.db(dbName);
			return Promise.resolve(_db);
		}
	);

export const getDb = () => _db;

export const getClient = () => _client;
