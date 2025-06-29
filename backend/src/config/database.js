import { connect } from "mongoose";
import { configurations } from "./config.js";
const mongodbURL = configurations.mongoUri;

export const Mongoose = connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log("Mongodb connection error:", error);
  });
