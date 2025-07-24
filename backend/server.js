
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passport from './config/passport.js';


const app = express();

// Connect Mongo
connectDB();

// Middleware
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());


//Routes
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);

app.get("/",(req,res)=>{
  res.send("Hello Joel");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

