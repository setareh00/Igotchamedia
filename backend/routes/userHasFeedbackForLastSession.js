const express = require('express');
const router = express.Router();
const connection = require('../moduls/database');

router.post('/', async function (req, res) {
    console.log('player req.body', req.body);
    const lastsessionId = await UserLastSessionId(req.body.userId);
    const userHasFeedback = await userHasFeedbackForLastSession(lastsessionId[0].SESSIONID, req.body.userId);
    if (userHasFeedback.length == 0) {
        res.status(200).send(lastsessionId[0]);
    } else
        res.status(200).send(userHasFeedback[0]);
})

async function UserLastSessionId(userId) {
    console.log('user Id:', userId);
    return new Promise(function (resolve, reject) {

        connection.query('SELECT MAX(ID) AS SESSIONID,MAX(GAME_ID) AS GAMEID, MAX(CREATED_DATE) FROM SESSIONS WHERE USER_ID=? GROUP BY USER_ID ', [userId], function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                console.log('UserLastSessionId result', result);
                resolve(result);
            }
        });
    })
}

function userHasFeedbackForLastSession(lastsessionId, userId) {

    return new Promise(function (resolve, reject) {

        connection.query('SELECT * FROM FEEDBACKS WHERE SESSION_ID=? AND USER_ID=? ', [lastsessionId, userId], function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                console.log('feedback result', result);
                resolve(result);
            }
        });
    })
}

module.exports = router;
