// import mongoose
const mongoose = require('mongoose');

// connect with atlas via mongoose
mongoose.connect('mongodb+srv://obaidullahzeb182:obaid123@cluster0.chrpiit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


// create schema
const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: {type: String, default: 'pending'}
});

// export model
module.exports = mongoose.model('Task', taskSchema);