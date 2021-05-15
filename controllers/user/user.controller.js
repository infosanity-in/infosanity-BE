const {
  successResponse,
  errorResponse,
} = require('../../utils/response');
const {
  createUserHelper,
  updateUserHelper,
} = require('./user.helper');

const createUser = async (req, res) => {
  try {
    let userData = await createUserHelper(req.body);
    userData = await updateUserHelper(userData);
    return successResponse({
      res,
      responseObject: {
        userData
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      error,
      responseMessage: 'Error creating user.',
    })
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = await updateUserHelper(req.body);
    return successResponse({
      res,
      responseObject: {
        userData
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      error,
      responseMessage: 'Error creating user.',
    })
  }
};
module.exports = {
  createUser,
  updateUser,
};
