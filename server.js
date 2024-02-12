const express = require('express')
const path = require('path')

const app = express()

// server default configs
app.use(express.static(path.join(__dirname , 'public')))
app.use(require('./form.js'))

app.get('/index.html', () => {
    res.sendFile(path.join(__dirname , 'public', 'index.html'))
})

// starting server
app.listen(process.env.PORT || 8080, () => {
    console.log('server listening on port 8080')
})