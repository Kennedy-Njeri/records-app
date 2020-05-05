const express = require('express')
const router = new express.Router()
const Contacts = require('../models/contacts')



router.get('/', (req, res) => {
    res.render('contacts/addOrEdit', {
        viewTitle: "Add Contact"
    })
})


router.post('/', async (req, res) => {
    if (req.body._id === '') {
        await insertContact(req, res)
    }
    else {
        await updateContact(req, res)
    }
});



const insertContact = async (req, res) => {
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
    
}

router.get('/list', async (req, res) => {
    try {
        await Contacts.find({}).sort({createdAt: -1}).lean().then(docs => {
            res.render('contacts/contactsList', {
                list: docs,
                viewTitle: "Contact List"
            })
        })

    } catch (err) {
        console.log('Error in retrieving Contacts list :' + err);
    }
    
    
})

const updateContact = async (req, res) => {
    try {
        await Contacts.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }).then(docs => {
            res.render('contacts/addOrEdit', {
                contacts: req.body,
                viewTitle: "Update Contact"
            })
        })
    } catch (e) {
        console.log('Error during record update : ' + e);
    }
   
}


router.get('/:id', async (req, res) => {
    try {
        await Contacts.findById(req.params.id).lean().then(docs => {
            console.log(docs)
            res.render('contacts/addOrEdit', {
                contacts: docs,
                viewTitle: "Update Contact"
            })
        })

    } catch (e) {
        console.log("The doc could not be found", e)
    }

})




router.post('/delete/:id', async (req, res) => {
    try {
        await Contacts.findByIdAndRemove(req.params.id)
        res.render('contacts/contactsList')

    }  catch (e) {
        console.log('Error in contact delete :' + e)
    }
})





module.exports = router
