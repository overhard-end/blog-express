require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();
const fileupload = require('express-fileupload');

app.use(express.json());
app.use(express.static('uploads'));
app.use(fileupload({}));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use('/api', router);

app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

const start = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(5000, () => console.log(' server is runned'));
  } catch (e) {
    console.log(e);
  }
};
start();
