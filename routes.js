const express = require('express')
const router = express.Router()

router.get('/index.html', () => {
    res.sendFile(path.join(__dirname , 'public', 'index.html'))
})

module.exports = router;