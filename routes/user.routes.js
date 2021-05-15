/* Admin Panel:
    Review Content( =Edit content)
    Add missing fields(content, tag, sourceMetaData etc)
    Mark content validity
    Or Pass to next admin
    Edit Content
    Add missing fields(content, tag etc)
    Mark as spam
    Delete Content
    Add new tags
    Edit tag ranks
    Manage user and roles
*/

const router = require('express').Router();
const UserController = require('../controllers/user/user.controller');
const {
    validateCreateUser,
    validateUpdateUser,
} = require('../controllers/user/user.middleware');

router.post('/', validateCreateUser, UserController.createUser);
router.patch('/:id', validateUpdateUser, UserController.updateUser);

module.exports = router;