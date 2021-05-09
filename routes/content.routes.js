const router = require('express').Router();
const ContentController = require('../controllers/content/content.controller');
const { validateContentGet } = require('../controllers/content/content.middleware');
const { sendVerificationEmail, findAndUpdateStatus } = require('../utils/emailVerification')

// Routes
router.get('/', validateContentGet, ContentController.getContent);

// TODO : implement the 'sendVerificationEmail' function below also with the content post endpoint.
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
      * To send the verification mail pass (email, 'mongoDB ID') to the function
      * The response of the function is Promise({message: String, error: Boolean})
        * True for mail successfully sent to the user
        * False for any kind of error
          * Too many emails
          * Connection limit reached
          * Daily limit reached
          * etc  
*/


// Adding user email verification endpoint.
router.get('/verify', (req, res) => {
  if(req.query.t !== undefined || req.query.t !== null || req.query.t !== '') res.sendStatus(403)
  if(req.query.t.length !== 40) res.sendStatus(403)
  else {
    findAndUpdateStatus(req.query.t).then(r => {
      res.sendStatus(200)
      // TODO : send success html or redirect to another page.
      // res.sendFile('success.html')
    })
    .catch(_ => res.sendStatus(403))
  }
    
})

/* PUT
  Edit content /:id
*/

/* DELETE
  Delete content /:id
*/

module.exports = router;