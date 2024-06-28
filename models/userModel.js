const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    }
    ,
    email: { type: String, require: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ['admin', 'user'] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
