const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema)