import express from 'express';
 import bodyParser from 'body-parser';
 import cors from 'cors';
 import { connectDB } from './config/database.js';
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  

  
  app.listen(3007, async () => {
    console.log("Server started");
        await connectDB();
        console.log('mongo Db connected');
  });