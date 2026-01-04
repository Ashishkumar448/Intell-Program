import { MongoClient } from 'mongodb';
import { logger } from './logger.js';

let db = null;
let client = null;

export async function connect() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME || 'express_app';
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    logger.info({ uri: uri.replace(/\/\/.*@/, '//***@') }, 'Connected to MongoDB');
    return db;
  } catch (err) {
    logger.error({ err }, 'Failed to connect to MongoDB');
    throw err;
  }
}

export async function disconnect() {
  if (client) {
    await client.close();
    logger.info('Disconnected from MongoDB');
  }
}

export function getDb() {
  if (!db) throw new Error('Database not connected');
  return db;
}