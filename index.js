const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');

const app = express();

// 1) MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanization against NoSQL query injection
app.use(mongoSanitize());

// Data saniaztion against XSS
app.use(xss());

// 2) ROUTES

app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/tracks', trackRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 405));
});

app.use(globalErrorHandler);

module.exports = app;
