const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const serverRouter = require('./routes/server.route');

const app = express();

// Set security headers
app.use(helmet());

// CORS options
const corsOptions = {
  origin: 'https://gmsc18-contributor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', serverRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});


module.exports = { app };
