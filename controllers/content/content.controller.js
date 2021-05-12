const { Content: ContentModel, } = require('../../models');
const { successResponse, errorResponse, } = require('../../utils/response');
const { CONTENT, VERIFICATION_HASH_LENGTH } = require('../../utils/constants');
const Pagination = require('../../utils/Pagination');
const { generateFindQuery, } = require('./content.helper');

const { sendVerificationEmail, findAndUpdateStatus } = require('../../utils/emailVerification')

const verifyEmail = async (req, res) => {
  try {
    const { hash } = req.params;
    if (!hash) res.sendStatus(403)
    if (hash.length !== VERIFICATION_HASH_LENGTH) res.sendStatus(403)
    else {
      let r = await findAndUpdateStatus(hash)
      // TODO : send success html or redirect to another page.
      // res.sendFile('success.html')
      if (r) res.sendStatus(200)
      else res.sendStatus(403)
    }
  } catch (err) {
    res.sendStatus(403)
  }

}

const getContent = async (req, res) => {
  try {
    const {
      searchQuery,
      sortType,
      sortDirection,
      filterType,
      filterValue,
      pageNumber = 1,
      pageSize = 20,
    } = req.query;

    const paginationUtil = new Pagination({
      pageNumber,
      pageSize
    });

    const findQuery = generateFindQuery({
      searchQuery,
      filterType,
      filterValue,
    });
    const sortClause = {
      [sortType]: 1
    };
    if (sortDirection === CONTENT.SORT_DIRECTION.DESC) {
      sortClause[sortType] = -1;
    }
    const skip = paginationUtil.getOffset();
    const limit = paginationUtil.getLimit();

    const contentData = await ContentModel.find(findQuery)
      .sort(sortClause)
      .skip(skip)
      .limit(limit);

    const responseObject = {
      contentData,
      pageNumber,
      pageSize,
    }
    return successResponse({
      res,
      responseObject,
    })
  } catch (error) {
    return errorResponse({
      res,
      error,
      responseMessage: 'Error listing content.',
    })
  }
}

module.exports = {
  getContent,
  verifyEmail
}