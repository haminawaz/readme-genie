require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { json as _json, urlencoded } from 'body-parser';
import { connectDB } from './src/config/database';
import { configurations } from './src/config/config';
import githubRoutes from './src/routes/github';
import contactRoutes from './src/routes/contact';

const port = configurations.port;
const version = configurations.apiVersion;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
app.use(_json());
app.use(urlencoded({ extended: true }));
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use(json());


app.use(`/api/${version}/ping`, (req, res) => {
    return res.json('It works');
});
app.use(`/api/${version}/github`, githubRoutes);
app.use(`/api/${version}/contact`, contactRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
