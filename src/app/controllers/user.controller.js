const { User } = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const sendEmail = require('../utils/SendGridHelper');

exports.create = (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    
    User.create(req.body)
        .then(data => {
            sendEmail(req.body.email);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.get = (req, res) => {

    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving movies'
            });
        });
}

exports.login = (req, res) => {
    
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {

                const comparePassword = bcrypt.compareSync(req.body.password, user.password);
                comparePassword ? res.send({ token: createToken(user) }) : res.status(403).send({ message: 'Wrong username or password' });
                
            } else {
                res.status(404).send({
                    message: `User not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error getting user`
            });
        });
    
}

const createToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email
    }

    return jwt.encode(payload, process.env.SECRET);
}