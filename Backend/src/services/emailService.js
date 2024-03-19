require('dotenv').config();

import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // Tắt xác nhận chứng chỉ
        }
    });
    console.log('email: ' + process.env.EMAIL_APP + ' pass: ' + process.env.EMAIL_APP_PASSWORD);

    const info = await transporter.sendMail({
        from: '"Hoang HBT 👻" <hoanghbt2v3@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lệnh khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHtmlEmail(dataSend)

    });
}

let getBodyHtmlEmail = (dataSend) => {
    let result;
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online từ web ...</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu thông tin đúng, hãy click link để xác nhận!!!</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn :))</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Hello ${dataSend.patientName}!</h3>
        <p>You have received this email because you booked an online medical appointment from the web ...</p>
        <p>Information on scheduling medical examinations:</p>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the information is correct, click the link to confirm!!!</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Sincerely thank :))</div>
        <div><b>Time: ${dataSend.time}</b></div>
        `
    }

    return result;

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}