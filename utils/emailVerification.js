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


async function generateVerificationHash(email, id) {
  try {
    let hash = crypto.createHmac('sha1', id).update(email).digest('hex');
    let doc = await content_db.findByIdAndUpdate(id, { $set: { verificationHash: hash } })
    if (doc) return hash
  } catch (err) {
    console.log(err)
  }
}


/**
 * Update Content Flag in DB to PENDING STATE
 * 
 * If hash is found in DB then it is prmoted to
 * Pending state and True is returned otherwise
 * False is returned 
 */
async function findAndUpdateStatus(hash) {
  try {
    let doc = await content_db.findOneAndUpdate({ verificationHash: hash }, { $set: { flag: content_consts.FLAGS.PENDING } })
    if (doc) return true
  } catch (err) {
    console.log(err)
  }
  return false
}


/**
 * (email: String, contentTitle: String, id: 'MongoDB ID') -> {message: String, error: Boolean}
 * 
 * This function sends the verification email and 
 * waits for the user to go to his/her email service and verify it from there.
 * The user will click the link which he'll receive in his email and 
 * the content will be verified.
 */
async function sendVerificationEmail(email, contentTitle, id) {

  try {
    // get hash
    let hash = await generateVerificationHash(email, id)
    if (!hash) return { message: 'unable to generate/insert hash', error: true }

    // TODO: please replace items with the correct variables
    //          Scheme + Domain            Verification Endpoint  'this part can stay'
    let link = 'https://infosanity.in' + '/verify/' + hash;

    let mailOptions = {
      from: 'Infosanity Team',
      to: email,
      subject: 'Verify Article on InfoSanity',
      text: `Please verify the article: "${contentTitle}"\n\nVerification Link ${link}\n\nPlease ignore if this email verification request was not sent by you.\nRegards\nInfoSanity Team`
    };

    let r_data = await new Promise((res, rej) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) rej({ message: err.message, error: true })
        else res({ message: 'Email sent: ' + info.response, error: false })
      })
    })

    return r_data

  } catch (err) {
    return { message: err.message, error: true }
  }

}

module.exports = {
  sendVerificationEmail,   // < ----------- USE THIS Function to send email.
  findAndUpdateStatus
}