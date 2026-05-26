import 'dotenv/config';
import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { initWebSocket } from './ws/server';
import { startWorker } from './queues/worker';

const PORT = parseInt(process.env.PORT || '4000', 10);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error('\n======================================================');
    console.error('❌ MONGODB CONNECTION FAILED');
    console.error('======================================================');
    console.error('If you are using MongoDB Atlas, this is likely because your');
    console.error('current IP address is not whitelisted.');
    console.error('1. Go to https://cloud.mongodb.com -> Network Access');
    console.error('2. Click "Add IP Address" -> "Allow Access from Anywhere" (0.0.0.0/0)');
    console.error('======================================================\n');
    console.error(err.message);
  }

  const server = http.createServer(app);
  initWebSocket(server);
  startWorker();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
