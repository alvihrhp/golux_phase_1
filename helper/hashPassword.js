'use strict';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

function hashPassword(password) {
    return bcrypt.hash(password, saltRounds)
        .then(function(hash) {
            return hash;
        });
}

module.exports = hashPassword;