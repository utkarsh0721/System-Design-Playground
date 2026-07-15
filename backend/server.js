import http from 'node:http';
import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import env from './config/env.js';

const server = http.createServer(app);

const start = async () => {
  try {
    await connectDatabase();
    server.listen(env.port, () => {
      console.log(`API running in ${env.nodeEnv} mode at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Unable to start API:', error.message);
    process.exit(1);
  }
};

const shutdown = (signal) => {
  console.log(`${signal} received. Closing gracefully...`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  shutdown('unhandledRejection');
});

start();
