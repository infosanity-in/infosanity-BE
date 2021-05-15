const { errorResponse } = require('../../utils/response');
const { STATUS_CODES } = require('../../utils/constants');
const { isValidObjectId, validateEmail } = require('../../utils/validationHelper');

const validateCreateUser = (req, res, next) => {
  try {
    // validate email, mobile
    return next();
  }
  catch (error) {
    return errorResponse({
      res,
      error,
    });
  }
};

const validateUpdateUser = (req, res, next) => {
  try {
    const userId = req.params.id;
    // validate Id, email, mobile(unique), roleId, 
    return next();
  }
  catch (error) {
    return errorResponse({
      res,
      error,
    });
  }
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};