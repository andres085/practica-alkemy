const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (email) => {
   const msg = {
      to: email, 
      from: "andresito.martinez1985@gmail.com",
      subject: 'Email Test',
      text: 'You are registered to Disney API',
      html: '<strong>You are registered to Disney API</strong>',
    }
    sgMail.send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

module.exports = sendEmail;