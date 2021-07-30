const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

const path = require('path');


const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');
const auth = require('./middleware/auth');


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

const corsOptions ={
  origin:'http://localhost:8080', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', userRoutes);
app.use('/api/message', auth, messageRoutes);
app.use('/api/comment', auth, commentRoutes);

module.exports = app;