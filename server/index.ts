import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { router as projectRoutes } from './routes/projects';
import { router as authRoutes } from './routes/auth';
import { router as taskRoutes } from './routes/tasks';
import { router as userRoutes } from './routes/users';
import { router as healthRoutes } from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { db } from '../src/database/database';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/health', healthRoutes);

// Socket.IO events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('projectUpdate', (data) => {
    socket.broadcast.emit('projectUpdated', data);
  });

  socket.on('taskUpdate', (data) => {
    socket.broadcast.emit('taskUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling
app.use(errorHandler);

// Test database connection
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;