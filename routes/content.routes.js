const router = require('express').Router();
const ContentController = require('../controllers/content/content.controller');
const {
  validateContentGet,
  validateContentPost,
  validateContentPut,
} = require('../controllers/content/content.middleware');

// Routes
router.get('/', validateContentGet, ContentController.getContent);

// TODO : use the 'sendVerificationEmail' function from 'utils/emailVerification' below also with the content post endpoint.
/* POST
Add content(any user)
email ''
name ''
title ''
content ''
tags []
otp ''
*/
/*
  sendVerificationEmail  
  After getting data from the user insert it into the database and send the verification email.
      * To send the verification mail pass (email, contentTitle, 'mongoDB ID') to the function
      * The response of the function is {message: String, error: Boolean}
        * True for mail successfully sent to the user
        * False for any kind of error
          * Too many emails
          * Connection limit reached
          * Daily limit reached
          * etc  
*/

// Create a new Post
router.post('/', validateContentPost, ContentController.postContent);

// Adding user email verification endpoint.
router.get('/verify/:hash', validateContentGet, ContentController.verifyEmail);

/* PUT
  Edit content /:id
*/
router.put('/:id', validateContentPut, ContentController.updateContent);

/* DELETE
  Delete content /:id
*/
router.delete('/:id', ContentController.deleteContent);

module.exports = router;
