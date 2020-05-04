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
        if (err.name === 'ValidationError') {
            handleValidationError(err, req.body)
            res.render('contacts/addOrEdit', {
                viewTitle: "Add Contact",
                contacts: req.body,
                err
            })
        }
     }
    
})

router.get('/list', (req, res) => {
    res.render('contacts/contactsList')
})


const handleValidationError = (err, body) => {
    for (let field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message
                break
            case 'email':
                body['emailError'] = err.errors[field].message
                break
            default:
                break
        }
    }
}



module.exports = router
