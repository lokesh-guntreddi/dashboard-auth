const express = require('express');
const MongoDB  = require('./db/db')
const router = require('./routes/user.routes')
const dotenv = require('dotenv')
const ejs = require('ejs')
const session = require('express-session')
const MongoStore = require("connect-mongo");
dotenv.config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);
app.use('/mypage',router)
const Port = process.env.PORT || 3000
app.listen(Port,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
});
MongoDB()



