const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')



router.get('/', (req, res) => {
    res.render('contacts/addOrEdit', {
        viewTitle: "Add Contact"
    })
})


router.post('/', async (req, res) => {
    try {
        const contacts = new Contacts()
        contacts.fullName = req.body.fullName
        contacts.email = req.body.email
        contacts.mobile = req.body.mobile
        contacts.city = req.body.city
        await contacts.save()
        res.redirect('/list')
    } catch (err) {
        res.render('contacts/addOrEdit', {
                    viewTitle: "Add Contact",
                    contacts: req.body,
                    err
                })
     }
    
})

router.get('/list', (req, res) => {
    res.render('contacts/contactsList')
})





module.exports = router
