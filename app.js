const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loginRoute = require('./api/routes/login');
const signupRoute = require('./api/routes/signup');

mongoose.connect('mongodb+srv://hitesh:hgarg5162@hitesh.mm673vo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
    console.error('Connection failed:', err);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found'
    });
});

module.exports = app;
