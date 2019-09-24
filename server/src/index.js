const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(9000);