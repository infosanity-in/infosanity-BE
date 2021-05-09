const nodemailer = require('nodemailer');
const content_db = require('../models').Content;
const content_consts = require('./constants').CONTENT
const crypto = require("crypto")

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


function generateVerificationHash(email, id) {
  let hash = crypto.createHmac('sha1', id).update(email).digest('hex');
  return content_db.findByIdAndUpdate(id, { $set: { verificationHash: hash } }).exec()
    .then(_ => hash)
    .catch(err => { console.log(err); return false })
}


/**
 * Update Content Flag in DB to PENDING STATE
 * 
 * If hash is found in DB then it is prmoted to
 * Pending state and True is returned otherwise
 * False is returned 
 */
function findAndUpdateStatus(hash) {
  return content_db.findOneAndUpdate({ verificationHash: hash }, { $set: { flag: content_consts.FLAGS.PENDING } }).exec()
    .then(_ => true)
    .catch(err => { console.log(err); return false })
}


/**
 * (email: String, contentTitle: String, id: 'MongoDB ID') -> Promise({message: String, error: Boolean})
 * 
 * This function sends the verification email and 
 * waits for the user to go to his/her email service and verify it from there.
 * The user will click the link which he'll receive in his email and 
 * the content will be verified.
 */
function sendVerificationEmail(email, contentTitle, id) {

  // get hash
  return generateVerificationHash(email, id)
    .then(hash => {

      // TODO: please replace items with the correct variables
      //          Scheme + Domain            Verification Endpoint  'this part can stay'
      let link = 'https://infosanity.com' + '/api/content/verify' + '?t=' + hash;

      let mailOptions = {
        from: 'Infosanity Team',
        to: email,
        subject: 'Verify Article on InfoSanity',
        text: `Please verify the article: "${contentTitle}"\n\nVerification Link ${link}\n\nPlease ignore if this email verification request was not sent by you.\nRegards\nInfoSanity Team`
      };

      return new Promise((res, rej) => {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) rej({ message: err.message, error: true })
          else res({ message: 'Email sent: ' + info.response, error: false })
        })
      })
    })


}

module.exports = {
  sendVerificationEmail,
  findAndUpdateStatus
}