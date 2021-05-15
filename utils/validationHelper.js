const { ObjectId } = require('mongoose').Types;
const { EMAIL_VALIDATE_REGEX } = require('./constants');

const isValidObjectId = id => ObjectId.isValid(id);

const validateEmail = email => {
    console.log(email)
    console.log(EMAIL_VALIDATE_REGEX)
    var re = EMAIL_VALIDATE_REGEX
    return re.test(String(email).toLowerCase());
}

module.exports = {
    validateEmail,
    isValidObjectId
};