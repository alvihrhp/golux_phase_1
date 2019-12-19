'use strict';

function checkBookAuthorization(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.send(`You have to login first`);
    }
}

module.exports = checkBookAuthorization;