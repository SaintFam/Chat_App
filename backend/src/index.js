//const express = require('express');
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})