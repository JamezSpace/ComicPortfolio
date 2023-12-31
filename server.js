const express = require('express')
const path = require('path')
const router = require('./routes.js')

const app = express()

// server default configs
app.use(express.static(path.join(__dirname , 'public')))
app.use(require('./form.js'))
app.use(router)

// starting server
app.listen(process.env.PORT || 8080, () => {
    console.log('server listening on port 8080')
})