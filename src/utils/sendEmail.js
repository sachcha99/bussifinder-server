const nodemailer = require('nodemailer');

const sendVerificationMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: 'ruvinadechithra@gmail.com',
                pass: 'ruvina123'
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log("Email sent successfully")
    } catch (error) {
        console.log("Email sent error: " , error)
    }
}
module.exports = {
    sendVerificationMail
}