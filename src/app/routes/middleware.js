const jwt = require('jwt-simple');

const checkToken = (req, res, next) => {

    if (!req.headers['user-token']) {
        return res.send({ error: 'Token not included' });
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'secret');
    } catch (error) {
        return res.send({ error: 'Token not valid' });
    }

    next();
}

module.exports = { checkToken: checkToken }
