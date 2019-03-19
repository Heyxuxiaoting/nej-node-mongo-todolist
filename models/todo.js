const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: false,
    }
}, { collection: 'todo' });
const TodoModel = mongoose.model('TodoModel', TodoSchema);

module.exports = TodoModel;