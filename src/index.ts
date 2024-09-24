import { connectToMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const launchServer = async () => {
  await connectToMongoDB();
  startServer();
};

launchServer();
