const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api-routes/users');
const orgRoutes = require('./api-routes/organization');
const servRoutes = require('./api-routes/services');

const app = express();
app.use(express.json());
app.use('/service',servRoutes)
app.use('/users', userRoutes);
app.use('/org', orgRoutes);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});



