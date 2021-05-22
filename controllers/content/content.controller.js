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

const postContent = async (req, res) => {
  try {
    const {
      title,
      content,
      name,
      email,
      otp
    } = req.body;

    const newPostData = {
      title,
      content, 
      type: CONTENT.TYPES.DEFAULT,
      flag: CONTENT.FLAGS.PENDING,
      isSpam: CONTENT.SPAM_TYPES.DEFAULT,
      tags: [],
      reviews: {
        isReviewed: false,
        reviewers: []
      },
      sourceMetaData: {},
      acl: {
        createdBy: {
          name, 
          email
        },
        updatedBy: {
          name,
          email
        }
      }
    }

    const newPostResponse = await ContentModel.create(newPostData);

    newPostResponse.save();

    return successResponse({ res });
  } catch (err) {
    return errorResponse({
      res,
      error: err,
      responseMessage: 'Error creating new content.',
    })
  }
}
};

const updateContent = async (req, res) => {
  try {
    const data = req.body && req.body.data ? req.body.data : req.body;
    const postId = req && req.params ? req.params.id : '';
    
    const { title, content, type, flag, isSpam, tags, reviews, sourceMetaData, acl } = data;

    const newPostData = {
      title,
      content,
      type,
      flag,
      isSpam,
      tags,
      reviews,
      sourceMetaData,
      acl,
    };

    const updatedContent = await ContentModel.findOneAndUpdate(
      postId,
      { ...newPostData },
      { new: true }
    );

    updatedContent.save();

    return successResponse({ res, statusCode: 201 });
  } catch (err) {}
};
module.exports = {
  getContent,
  verifyEmail,
  postContent,
  updateContent,
