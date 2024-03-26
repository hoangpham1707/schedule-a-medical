import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRouters from "./route/web.js";
import connectDB from './config/connectDB.js'
import cookieParser from 'cookie-parser'

require('dotenv').config();
import cors from 'cors'

let app = express();
app.use(cors({ credentials: true, origin: true }));

//Add Header
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Alow-Origin', 'http://localhost:3000');

//     res.setHeader('Access-Control-Alow-Methods', 'GET,POST,PUT,PATCH,DELETE');

//     res.setHeader('Access-Control-Alow-Headers', 'X-Requested-with,content-type');

//     res.setHeader('Access-Control-Alow-Credentials', true);

//     next();
// })
//Config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

viewEngine(app);
initWebRouters(app);

connectDB();

app.use((req, res) => {
    return res.send('404 not found!')
})
let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Run: " + port);
});


