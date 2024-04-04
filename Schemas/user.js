const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const schema = mongoose.Schema

const userSchema = new schema({
    name: String,
    role: String,
    phone: {type: String, unique: true},
    email: {type: String, unique: true},
    age: Number,
    password: String,

})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('Users', userSchema)