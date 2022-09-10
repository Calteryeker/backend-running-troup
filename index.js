const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECT);

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    cors({origin: '*'})
    next()
});
app.use(routes);

//inicia o servidor
app.listen(process.env.PORT || 3030);