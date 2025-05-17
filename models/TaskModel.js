// import mongoose
const mongoose = require('mongoose');

// connect with atlas via mongoose
// mongoose.connect('');


// create schema
const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: {type: String, default: 'pending'}
});

// export model
module.exports = mongoose.model('Task', taskSchema);