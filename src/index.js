const express = require('express')
require('./db/mongoose')
const contactsRouter = require('./routers/contacts')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')




const app = express()
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'hbs')







// https://httpstatuses.com/
// parse our incoming json data for use into an object
app.use(express.json())



app.use(contactsRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
