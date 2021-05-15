// Import Dependencies
const path = require('path');
const envPath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`);
require('dotenv').config({ path: envPath });
const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
require('./config/passport')(passport);

// Setup App
const app = express();
const PORT = process.env.PORT || 8000;

// Define Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(passport.initialize());

// API Routes
app.get('/api/', (req, res) => {
  res.json({
    name: 'Infosanity Backend',
    message: 'Welcome Developer !',
  });
});
app.use(router);
// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;
