const express = require('express');
const app = express();
const auth = require('../backEnd/routes/auth');
const mysql = require('mysql');

app.use(express.json());
app.use('/api/login', auth);
// app.use(express.urlencoded())

// // api/auth Api should handle by auth Route
//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))