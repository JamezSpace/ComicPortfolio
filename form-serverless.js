import { configDotenv } from "dotenv";
import { urlencoded, json } from "body-parser";
import { createTransport } from "nodemailer";

configDotenv()
urlencoded({ extended: true })
json()

let transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.portfolio_email,
        pass: process.env.portfolio_email_password
    }
}),
retry_count = 0

async function send_email(mail_details) {
    let sent = false
    retry_count += 1
    if (!(retry_count <= 3)) { console.log(`Error sending email after ${retry_count} times`); return sent; }

    transporter.sendMail(mail_details, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);

            send_email(mail_details)
        } else {
            console.log('Email sent:', info.response);
            sent = true;
        }
    })

    return sent
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(403).end()

    const { name, email, message } = req.body,
        fullMessage = `Hi, I am ${name}. Here's my message: \n\n${message}\n\nHere's my email: ${email}\nThank you.
        `

    mail_details = {
        from: process.env.portfolio_email,
        to: process.env.portfolio_email,
        subject: "Message from your portfolio",
        text: fullMessage
    }

    await send_email(mail_details) ? 
        res.status(200).send({ status: 1 }) 
        : 
        res.status(500).send({ status: 0 })
}