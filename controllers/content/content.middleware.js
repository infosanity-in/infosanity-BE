const {
  errorResponse
} = require('../../utils/response');
const {
  STATUS_CODES,
  CONTENT
} = require('../../utils/constants');
const {
  isValidObjectId
} = require('../../utils/validationHelper');
const validateContentGet = (req, res, next) => {
  try {
    const {
      filterType,
      filterValue,
      sortType,
    } = req.query;

    if (filterType && !Object.values(CONTENT.FILTER_TYPES).includes(filterType)) {
      return {
        code: STATUS_CODES.INVALID_FORMAT,
        message: 'Invalid filter type.'
      };
    }

    if (filterValue) {
      const filterValues = filterValue.split(',');
      filterValues.forEach(value => {
        if (!isValidObjectId(value)) {
          throw {
            code: STATUS_CODES.INVALID_FORMAT,
            message: 'Invalid filter value.'
          }
        }
      })
    }
    if (sortType && !Object.values(CONTENT.SORT_TYPES).includes(sortType)) {
      return {
        code: STATUS_CODES.INVALID_FORMAT,
        message: 'Invalid sort type.'
      }
    }

    return next();
  } catch (error) {
    return errorResponse({
      res,
      error,
    })
  }
};

module.exports = {
  validateContentGet,
}