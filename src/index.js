const express = require('express')
require('./db/mongoose')





const app = express()
const port = process.env.PORT || 3000








// https://httpstatuses.com/
// parse our incoming json data for use into an object
app.use(express.json())





app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
