const mongoose = require('mongoose')




const contactsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
}, {
    timestamps: true
})




const Contacts = mongoose.model('Contacts', contactsSchema)


module.exports = Contacts