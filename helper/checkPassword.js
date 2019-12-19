'use strict';

const bcrypt = require('bcryptjs');

function checkPassword(password, passwordHashed) {
    return bcrypt.compare(password, passwordHashed)
}

module.exports = checkPassword;

