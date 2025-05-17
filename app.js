const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const TaskModel = require('./models/TaskModel');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
app.get('/', (req, res) => {
    res.render('index');
})

// ======================= Create Task =======================

app.post('/create', async (req, res) => {
    const {title, description} = req.body;
    
    const task = TaskModel.create({
        title: title,
        description: description
    })

    res.render('index', {task})
})


// ======================= Read Task =======================

app.get('/tasks', async (req, res) => {
    const tasks = await TaskModel.find();
    console.log("Tasks found:", tasks); // Check if data is retrieved

    res.render('tasks', {tasks})
})

// ======================= Update Task =======================

// Edit Task Page =======================
app.get('/edit/:id', async (req, res) => {
    const task = await TaskModel.findById(req.params.id);
    res.render('edit', { task });
});

// Update Task =========================
app.post('/update/:id', async (req, res) => {
    const { title, description } = req.body;

    await TaskModel.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true }
    );

    res.redirect("/tasks");
});



// ======================= delete Task =======================

app.get('/delete/:id', async (req, res) => {
    let tasksToBeDeleted = await TaskModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/tasks');
})

// ============================================================

app.listen(3200, () => {
    console.log("app hosted on http://localhost:3200");
})