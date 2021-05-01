const router = require('express').Router();
const ContentController = require('../controllers/content/content.controller');
const {
  validateContentGet
} = require('../controllers/content/content.middleware');

// Routes
router.get('/', validateContentGet, ContentController.getContent);

/* POST
Add content(any user)
email ''
name ''
title ''
content ''
tags []
otp ''
*/

/* PUT
  Edit content /:id
*/

/* DELETE
  Delete content /:id
*/

module.exports = router;