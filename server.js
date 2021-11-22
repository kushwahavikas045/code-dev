require('dotenv').config();
const express = require('express');
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

app.use(cookieParser());
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
}

app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
DbConnect();
const router = require('./router');
app.use(express.json());
app.use(router);

//server static assets in producation
if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    
    app.get("*", (req, res) =>{
      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

const PORT  = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`PORT IS RUNNING ON ${PORT}`));