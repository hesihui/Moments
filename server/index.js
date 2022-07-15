import express from 'express';
import bodyParse from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from "./routes/posts.js";

const app = express();

// set up uploaded limit: not excceed 30mb
app.use(bodyParse.json({ limit: "30mb", extended: true }));
app.use(bodyParse.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
// set up the starting path
// localhost:5000/posts
app.use('/posts', postRoutes);

const CONNECTION_URL =
    "mongodb+srv://sardar:sardar960702@cluster0.sawzgaz.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() =>  app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));




