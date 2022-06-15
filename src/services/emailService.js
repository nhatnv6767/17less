require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (receiverEmail) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP.user, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
};


// async..await is not allowed in global scope, must use a wrapper
async function main() {


}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
};