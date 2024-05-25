const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function (v) {
            return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
    },
    password: { type: String, required: true, minLength: 6 }
})

module.exports = model('User',UserSchema);

