const express = require('express')
const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended : true}))

app.post('/submit', (req, res) => {
    const userName = req.body.name
    const message = req.body.message
    const email = req.body.email

    const fullMessage = `
        Hi, I am ${userName},

        Here's my message: ${message}

        Here's my email: ${email}
        Thank you.
    `
    res.redirect('/')
})

module.exports = app