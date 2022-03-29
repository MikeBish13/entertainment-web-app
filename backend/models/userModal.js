const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    bookmarks: {
        type: Array,
        items: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)