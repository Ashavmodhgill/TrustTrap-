import express from 'express';
 import bodyParser from 'body-parser';
 import { connectDB } from './config/database.js';
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  


  app.listen(4007, async () => {
    console.log("Server started");
        await connectDB();
        console.log('mongo Db connected');
  });