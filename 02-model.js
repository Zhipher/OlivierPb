const { Schema, model } = require('mongoose')

const schemaUser = Schema({
    login : {
        type : String,
        required : true,
        minlength : 5,
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
    }
})

const User = model('user', schemaUser)

module.exports = User