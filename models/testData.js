const mongoose = require('mongoose')

const testDataSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    val: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('testData', testDataSchema)