const mysql = require('mysql');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/api/', require('./routes/api'));

app.listen(3000);

