const express = require('express')
const router = new express.Router()



router.get('/', (req, res) => {
    res.render('contacts/addOrEdit', {
        viewTitle: "Add Contact"
    })
})





module.exports = router
