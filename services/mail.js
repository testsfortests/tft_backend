import nodemailer from 'nodemailer';
import dotenv from "dotenv" 
import logger from '../utils/logger.js';

dotenv.config()

function sendEmail(send_to,subject,message) {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.OUTLOOK_USER,
            pass:  process.env.OUTLOOK_PASS
        }
    });

    // Setup email data with unicode symbols
    const mailOptions = {
        from: process.env.OUTLOOK_USER, // sender address
        to: send_to, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        // html: '<b>Hello world!</b>' // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return logger.info(error);
        }
        logger.info('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

// Call the function to send the email
// sendEmail("pawanmtr123456789@gmail.com","testing subject","hii hello");
