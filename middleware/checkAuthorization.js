'use strict';

function checkAuthorization(req, res, next) {
    if(req.session.user.role === 'Admin') {
        next();
    } else {
        res.send('Anda bukan seorang Admin');
    }
}

module.exports = checkAuthorization;