const nodemailer = require('nodemailer')

const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
});

function sendEmail(message) {
    mailTransporter.sendMail(message, function(err, data) {
        message.from = process.env.EMAIL_USERNAME
        message.name = 'myguests support'
        if(err) {
            console.log('Email failed to send:', err);
        }
    });
}

module.exports = { sendEmail }
