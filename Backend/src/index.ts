import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import ApiRoutes from "./api";

import passport from 'passport'
import initializePassport from './auth/Auth'

const PORT = process.env.PORT || 8000

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

app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())
initializePassport(passport)

app.use((req,res, next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
  res.setHeader("Access-Control-Allow-Headers","content-type")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  next();
})

app.use('/api',ApiRoutes)

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started on port ${PORT}`);
});
