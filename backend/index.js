const express = require('express');
const app = express();
const auth = require('../backEnd/routes/auth');
const userLastSessionFeedback = require('../backEnd/routes/userHasFeedbackForLastSession');
const insertComment = require('../backEnd/routes/insertComment');

// const path = require('path');
// const mysql = require('mysql');

app.use(express.json());
app.use('/api/login', auth);
app.use('/api/userLastSession', userLastSessionFeedback);
app.use('/api/insertcomment', insertComment);

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../frontend/index.js'), function (err) {
//         if (err) {
//             res.status(500).send(err)
//         }
//     })
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))