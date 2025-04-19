import express, { json } from 'express';
import morgan from 'morgan';
import dbConnection from './config/database.js';
import globalError from './middlewares/errorMiddleware.js';
import categoryRoute from './routes/categoryRoute.js';
import ApiError from './utils/apiError.js';

process.loadEnvFile('.env');

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);

app.all(/.*/, (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
