const { errorResponse } = require('../../utils/response');
const { STATUS_CODES, CONTENT } = require('../../utils/constants');
const { isValidObjectId, validateEmail } = require('../../utils/validationHelper');
const emailValidator = require('email-validator');

const MESSAGES = require('../../utils/message');

const validateContentGet = (req, res, next) => {
  try {
    const { filterType, filterValue, sortType } = req.query;

    if (filterType && !Object.values(CONTENT.FILTER_TYPES).includes(filterType)) {
      return {
        code: STATUS_CODES.INVALID_FORMAT,
        message: 'Invalid filter type.',
      };
    }

    if (filterValue) {
      const filterValues = filterValue.split(',');
      filterValues.forEach((value) => {
        if (!isValidObjectId(value)) {
          throw {
            code: STATUS_CODES.INVALID_FORMAT,
            message: 'Invalid filter value.',
          };
        }
      });
    }
    if (sortType && !Object.values(CONTENT.SORT_TYPES).includes(sortType)) {
      return {
        code: STATUS_CODES.INVALID_FORMAT,
        message: 'Invalid sort type.',
      };
    }

    return next();
  } catch (error) {
    return errorResponse({
      res,
      error,
    });
  }
};

const validateContentPost = (req, res, next) => {
  try {
    const { title, content, email, name } = req.body;

    // Validate post title
    if (!title) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_TITLE,
      };
    } else {
      if (title && title.length <= CONTENT.MISC.TITLE_LENGTH) {
        return {
          code: STATUS_CODES.VALIDATION_FAILED,
          message: MESSAGES.CONTENT.ERROR.TITLE_LENGTH_SHORT,
        };
      }
    }

    // Validate Post content
    if (!content) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_CONTENT,
      };
    }

    // Validate user email
    if (!email) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_EMAIL,
      };
    } else {
      if (email && email.length > 0) {
        //? I was not able to use the email validator, and installed a new one
        //? We need to see why Regex is taking too long
        // return emailValidator.validate(email)
        return validateEmail(email);
      }
    }

    // Validate user name
    if (!name) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_USERNAME,
      };
    } else {
      if (name && name.length <= CONTENT.MISC.NAME_LENGTH) {
        return {
          code: STATUS_CODES.VALIDATION_FAILED,
          message: MESSAGES.CONTENT.ERROR.NAME_TOO_SHORT,
        };
      }
    }

    return next();
  } catch (err) {
    return errorResponse({
      res,
      error: err,
    });
  }
};

const validateContentPut = async (req, res) => {
  try {
    const {
      title,
      content,
      acl: { email },
    } = req.body;

    // Validate post title
    if (!title) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_TITLE,
      };
    } else {
      if (title && title.length <= CONTENT.MISC.TITLE_LENGTH) {
        return {
          code: STATUS_CODES.VALIDATION_FAILED,
          message: MESSAGES.CONTENT.ERROR.TITLE_LENGTH_SHORT,
        };
      }
    }

    // Validate Post content
    if (!content) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_CONTENT,
      };
    }

    // Validate user email
    if (acl && !acl.email) {
      return {
        code: STATUS_CODES.NO_CONTENT,
        message: MESSAGES.CONTENT.ERROR.NO_EMAIL,
      };
    } else {
      if (acl && acl.email && acl.email.length > 0) {
        //? I was not able to use the email validator, and installed a new one
        //? We need to see why Regex is taking too long
        // return emailValidator.validate(email)
        return validateEmail(email);
      }
    }

    // Validate user name
    // Todo - Add Name in Acl
    // if (!name) {
    //   return {
    //     code: STATUS_CODES.NO_CONTENT,
    //     message: MESSAGES.CONTENT.ERROR.NO_USERNAME,
    //   };
    // } else {
    //   if (name && name.length <= CONTENT.MISC.NAME_LENGTH) {
    //     return {
    //       code: STATUS_CODES.VALIDATION_FAILED,
    //       message: MESSAGES.CONTENT.ERROR.NAME_TOO_SHORT,
    //     };
    //   }
    // }
  } catch (err) {
    return errorResponse({
      res,
      error: err,
    });
  }
};

module.exports = {
  validateContentGet,
  validateContentPost,
  validateContentPut,
};
