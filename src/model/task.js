const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = mongoose.Schema({
    
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    service: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email invalid')
            }
        }
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true, 
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task