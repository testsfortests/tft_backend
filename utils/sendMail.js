import nodemailer from 'nodemailer';

function sendEmail() {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'testsfortests@outlook.com',
            pass: 'TFT@987654321'
        }
    });

    // Setup email data with unicode symbols
    const mailOptions = {
        from: 'testsfortests@outlook.com', // sender address
        to: 'pawanmtr123456789@gmail.com', // list of receivers
        subject: 'Test Email from Nodemailer', // Subject line
        text: 'Hello world!', // plain text body
        html: '<b>Hello world!</b>' // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

// Call the function to send the email
sendEmail();
