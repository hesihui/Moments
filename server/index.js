import express from 'express';
import bodyParse from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// set up uploaded limit: not excceed 30mb
app.use(bodyParse.json({ limit: "30mb", extended: true }));
app.use(bodyParse.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
// set up the starting path
// localhost:5000/posts
app.use('/posts', postRoutes);

// need extra .env file to config db and port
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() =>  app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));




