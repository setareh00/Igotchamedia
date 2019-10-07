const express = require('express');
const router = express.Router();
const Joi = require('joi');
const connection = require('../moduls/database');

router.post('/', async function (req, res) {
    console.log('req.body', req.body);

    const { gameId, sessionId, userId, comment, rate } = req.body;

    const insert = inserComment(gameId, sessionId, userId, comment, parseInt(rate));
    console.log('insert', insert);
    return res.send(insert[0]);
})

function inserComment(gameId, sessionId, userId, comment, rate) {
    // connection.connect(function (err) {
    //     if (err) {
    //         console.error('error connecting: ' + err);
    //         return;
    //     }
    //     console.log('connected as id ' + connection.threadId);
    // });
    console.log('rate in insertComment fn', rate);
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO FEEDBACKS (GAME_ID, SESSION_ID,USER_ID, COMMENT, RATE) VALUES(?,?,?,?,?)', [gameId, sessionId, userId, comment, rate], function (error, result) {
            if (error)
                reject(error);
            else {
                console.log('result', result.insertId);
                // connection.end();
                resolve(result);
            }
        });
    })
    // console.log('user in finduser', user);
    // return user
}
module.exports = router;
