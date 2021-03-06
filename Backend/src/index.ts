import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ApiRoutes from "./api";

dotenv.config();
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if(err){
        // tslint:disable-next-line:no-console
        console.log(err);
    }else{
        // tslint:disable-next-line:no-console
        console.log("Connected to database...");
    }
  }
);

const app = express();

app.use(express.json())

app.use('/api',ApiRoutes)

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log("Server Started...");
});
