const { User } = require('../config/db.config');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/CreateToken');
const sendEmail = require('../utils/SendGridHelper');

exports.create = async(req, res) => {

    if (!req.body.username || !req.body.password) {
        res.status(400).send({ error: 'Username and password its needed to create an account' });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    try {
        const newUser = await User.create(req.body);
            sendEmail(req.body.email);
            res.status(200).send({message: 'User registered successfully'});

    } catch (error) {
         res.status(500).send({
                message: 'Something went wrong when trying to create an account'
            })
    }
}

exports.get = (req, res) => {

    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving users'
            });
        });
}

exports.login = async (req, res) => {

    try {
        const foundUser = await User.findOne({ where: { email: req.body.email } });

        if (!foundUser) {

           return res.status(404).send({
                    message: `User not found`
                });
        } 
        
        const comparePassword = bcrypt.compareSync(req.body.password, foundUser.password);
        comparePassword ? res.send({ token: createToken(foundUser) }) : res.status(403).send({ message: 'Wrong username or password' });
        
    } catch (error) {
        res.status(500).send({
                message: `Error getting user`
            });
    }
}
