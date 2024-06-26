const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const Staff_table = require('./Routes/Staff_table');
const Mothers_table = require('./Routes/Mothers_table');
const Childrens_table = require('./Routes/Childrens_table');
const Items_table = require('./Routes/Items_table');
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());
app.use('/Staff_table', Staff_table);
app.use('/Mothers_table', Mothers_table);
app.use('/Childrens_table', Childrens_table);
app.use('/Items_table', Items_table);





module.exports = app;