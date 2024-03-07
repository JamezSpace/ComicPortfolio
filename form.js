const express = require('express'),
    bodyparser = require('body-parser'),
    nodemailer = require('nodemailer')
const app = express()

app.use(bodyparser.urlencoded({extended : true}))
app.use(bodyparser.json())

app.post('/submit', (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body,
        fullMessage = `Hi, I am ${name}. Here's my message: \n\n${message}\n\nHere's my email: ${email}\nThank you.
    `

    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.portfolio_email,
            pass : process.env.portfolio_email_password
        }
    }), 
    retry_count = 0,
    mail_details = {
        from : process.env.portfolio_email,
        to : process.env.portfolio_email,
        subject : "Message from your portfolio",
        text : fullMessage
    }

    async function send_email(mail_details){
        let sent = false
        retry_count += 1
        if (!(retry_count <= 3)) { console.log(`Error sending email after ${retry_count} times`); return sent;}

        await transporter.sendMail(mail_details, (error, info) => {
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

    send_email(mail_details) ? res.send({status : 1}) : res.send({status : 0})
})

module.exports = app