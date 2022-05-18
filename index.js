import express from "express";
const app = express();
import fetch from "node-fetch";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();

import {dirname} from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from "express-mongo-sanitize"

import { fileURLToPath } from "url";
import path from 'path'

import Post from "./model/dataSchema.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

 
app.get('/api/v1/tasks', async (req, res)=>{
    try {
        const tasks = await Post.find({}).limit(10)
        res.status(200).json({tasks:tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
})
app.get('/api/v1', async (req, res)=>{
    res.json({msg:"Welcome!"})
})

const getPosts = async () => {
  try {
    const response = await fetch(`https://api.wazirx.com/api/v2/tickers`);
    const data = await response.json();

    for (let i = 0; i < 10; i++) {
      const post = new Post({
        name: Object.values(data)[i]["name"],
        last: Object.values(data)[i]["last"],
        buy: Object.values(data)[i]["buy"],
        sell: Object.values(data)[i]["sell"],
        volume: Object.values(data)[i]["volume"],
        base_unit: Object.values(data)[i]["base_unit"],
      });   
      post.save();
    }
  } catch (error) {
    console.log(error);
  }
};

getPosts();

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, './client/build','index.html' ))
})

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port,  console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
