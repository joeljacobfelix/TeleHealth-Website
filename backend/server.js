import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Connect Mongo
connectDB();

// Middleware
app.use(express.json());
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);

//Routes
app.get("/",(req,res)=>{
  res.send("Hello Joel");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
