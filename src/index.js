import dotenv from 'dotenv';
dotenv.config({ path: './project.env' }); 


import express from 'express';
 import bodyParser from 'body-parser';
 import { connectDB } from './config/database.js';

 import apiRoutes from './routes/index.js';
 import passport from 'passport';
import {passportAuth} from './config/jwt-middleware.js';

passportAuth(passport);


  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api',apiRoutes);
 const PORT = process.env.PORT || 5000;

  app.listen(PORT, async () => {
    console.log("Server started");
        await connectDB();
        console.log('mongo Db connected');
  });