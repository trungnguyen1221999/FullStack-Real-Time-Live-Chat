import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import { protectedRoute } from './middleware/authMiddleware.js';
import cors from 'cors';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));



// Middleware
app.use(cookieParser());

app.use(express.json());

//public routes

app.use('/api/auth', authRoutes);



//private routes
app.use(protectedRoute)
app.use('/api/users', userRoute);

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World! 🌍', 
    status: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});


// Start server

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  });
