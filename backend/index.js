import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Mongoose } from "./src/config/database.js";
import { configurations } from "./src/config/config.js";
import githubRoutes from "./src/routes/github.js";
// import contactRoutes from "./src/routes/contact.js";

const port = configurations.port;
const version = configurations.apiVersion;

config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/${version}/ping`, (req, res) => {
  return res.json("It works");
});
app.use(`/api/${version}/github`, githubRoutes);
// app.use(`/api/${version}/contact`, contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
