const express = require('express'),
    bodyparser = require('body-parser'),
    nodemailer = require('nodemailer')
const app = express()

app.use(bodyparser.urlencoded({extended : true}))

app.post('/submit', (req, res) => {
    const { userName, email, message } = req.body,
        fullMessage = `
        Hi, I am ${userName},

        Here's my message: ${message}

        Here's my email: ${email}
        Thank you.
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

    function send_email(mail_details){
        retry_count += 1
        if (!(retry_count <= 3)) { console.log(`Error sending email after ${retry_count} times`); return;}

        transporter.sendMail(mail_details, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
    
                send_email(mail_details)
            } else {
                console.log('Email sent:', info.response);
            }
        })
    }

    send_email(mail_details)

    res.redirect('/')
})

module.exports = app