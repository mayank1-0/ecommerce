const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // Use 465 for secure connection (SSL) 587 for less secure
        secure: false, // Use true if you're using port 465 otherwise false
        auth: {
            user: process.env.SENDING_FROM_EMAIL,
            pass: process.env.SENDING_FROM_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SENDING_FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;