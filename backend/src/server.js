import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoute.js';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

//public routes

app.use('/api/auth', authRoutes);



//private routes


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
