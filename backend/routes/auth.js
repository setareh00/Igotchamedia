const express = require('express');
const router = express.Router();
const Joi = require('joi');
const connection = require('../moduls/database');



router.post('/', async function (req, res) {
    console.log('req.body', req.body);
    // const user = {};
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await findUser(req.body.email, req.body.password)
    console.log('backend user', user);
    if (!user) return res.status(400).send('Invalid UserName or Password!')
    res.status(200).send(user[0]);
})

function findUser(email, password) {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });

    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM USERS WHERE EMAIL= ? AND PASSWORD = ? ', [email, password], function (error, result) {
            if (error)
                reject(error);
            else {
                console.log('result', result);
                // connection.end();
                resolve(result);
            }
        });
    })
    // console.log('user in finduser', user);
    // return user
}


function validation(user) {
    const schema = {
        email: Joi.string().min(5).max(100).email().required(),
        password: Joi.string().min(5).max(100).required()
    }
    return Joi.validate(user, schema);
}
module.exports = router;

