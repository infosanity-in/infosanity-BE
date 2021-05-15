const { ROLE } = require('../../utils/constants');
const {
  User: UserModel,
  Role: RoleModel,
} = require('../../models');

const createUserHelper = async (userData) => {
  const {
    name,
    email,
    isAdmin = false,
    roleId,
    mobile,
  } = userData;
  if (isAdmin) {
    roleId = await getAdminRoleId();
  }

  const userObject = {
    name,
    email,
    isAdmin,
    roleId,
    mobile,
  }
  const userDocument = new UserModel(userObject);
  await userDocument.save();
  return userDocument;
};

// TODO: move to role helper later
const getAdminRoleId = async () => {
  const { _id } = await RoleModel.findOne({ name: ROLE.ADMIN_ROLE_NAME }, {});
  return _id;
};

const updateUserHelper = async (userData) => {
  const {
    _id: userId,
    email: userEmail,
    name: userName,
    mobile,
    acl,
    isAdmin,
    roleId,
  } = userData;

  // TODO: req.user will contain user credentials of user hitting the API, ie: Admin
  const {
    _id: aclId = userId,
    name: aclName = userName,
    email: aclEmail = userEmail,
  } = req.user || {};
  const userObject = {};
  if (userEmail) {
    userObject.email = userEmail;
  }
  if (userName) {
    userObject.name = userName;
  }
  if (mobile) {
    userObject.mobile = mobile;
  }
  if (roleId) {
    userObject.roleId = roleId;
  }
  if (isAdmin) {
    userObject.isAdmin = true;
    userObject.roleId = await getAdminRoleId();
  }
  if (acl) {
    userObject.acl = acl;
    userObject.acl.updatedBy = {
      id: aclId,
      name: aclName,
      email: aclEmail,
    };
  }
  else {
    // updating user just after creation
    // TODO: user aclId here too, once auth is setup
    const aclData = {
      id: userId,
      name: userName,
      email: userEmail,
    }
    userObject.acl = {
      createdBy: { ...aclData },
      updatedBy: { ...aclData },
    };
  }
  const userDocument = await UserModel.updateOne({ _id: userId }, userObject, { new: true });
  await userDocument.save();
  return userDocument;
};

module.exports = {
  createUserHelper,
  updateUserHelper,
};
