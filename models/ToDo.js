let mongoose = require('mongoose')

let ToDo = new mongoose.Schema({
    priority: {
        type: String,
        required: true,
        // default: "low"
    },
    todoValue: {
        type: String,
        required: true,
    },
    description: String
})

module.exports = mongoose.model('ToDo', ToDo)