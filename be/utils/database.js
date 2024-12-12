const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://andryanzulfi:andryan123@cluster0.dhc8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));