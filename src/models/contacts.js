const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator');




const contactsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: "Full Name is required",
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid!")
            }
        }
    },
    mobile: {
        type: String,
        required: "Mobile is required"
    },
    city: {
        type: String
    }
}, {
    timestamps: true
})




const Contacts = mongoose.model('Contacts', contactsSchema)


contactsSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique.' })


module.exports = Contacts