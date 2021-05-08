const { ObjectId } = require('mongoose').Types;
const { EMAIL_VALIDATE_REGEX } = require('./constants');

const isValidObjectId = id => ObjectId.isValid(id);

const validateEmail = email => {
    return EMAIL_VALIDATE_REGEX.test(email);
}

module.exports = {
    validateEmail,
    isValidObjectId
};