require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <dangtphuong0000@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
};


let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result =
            `
                <h3>Xin chào ${dataSend.patientName}!</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online Take care your health</p>
                <p>Thông tin đặt lịch khám bệnh: </p>
                <div>
                    <b>Thời gian: ${dataSend.time}</b>
                </div>
                <div>
                    <b>Bác sĩ: ${dataSend.doctorName}</b>
                </div>
                <p>Nếu các thông tin trên là chính xác, vui lòng nhấn vào đường link bên dưới để xác nhận
                    và hoàn tất thủ tục đặt lịch khám bệnh.
                </p>
                <div>
                    <a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây</a>
                </div>
                <div>
                    Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.
                </div>
        
            `;
    }

    if (dataSend.language === "en") {
        result =
            `
                <h3>Dear ${dataSend.patientName}!</h3>
                <p>You received this email because you made an online appointment with Take care your health</p>
                <p>Information to book a medical appointment: </p>
                <div>
                    <b>Duration: ${dataSend.time}</b>
                </div>
                <div>
                    <b>Doctor: ${dataSend.doctorName}</b>
                </div>
                <p>If the above information is correct, please click the link below to confirm
                     and complete the medical appointment booking process.
                </p>
                <div>
                    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
                </div>
                <div>
                    Thank you for trusting and using our service.
                </div>
        
            `;
    }

    return result;
};

let sendAttachment = (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <dangtphuong0000@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
                // text: "Hello world?", // plain text body
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {   // encoded string as an attachment
                        filename: 'Information.png',
                        content: dataSend.imgBase64.split("base64")[1],
                        // search: node js send image base64 as attachment
                        encoding: 'base64', //
                    },
                ],
            });
            console.log("Check infor send email: ");
            console.log(info);
            resolve();
        } catch (e) {
            reject(e);
        }
    });

};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result =
            `
                <h3>Xin chào ....!</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online Take care your health thành công</p>
                <p>Thông tin đơn thuốc/hoá đơn được gửi trong file đính kèm. </p>
                
                <div>
                    Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.
                </div>
        
            `;
    }

    if (dataSend.language === "en") {
        result =
            `
                <h3>Dear ....!</h3>
                <p>You received this email because you made an online appointment with Take care your health succ
                </p>
                <p>Attachment </p>
                
                <div>
                    Thank you for trusting and using our service.
                </div>
        
            `;
    }

    return result;
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
};