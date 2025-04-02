import express, { json } from 'express';
import morgan from 'morgan';
import dbConnection from './config/database.js';
import categoryRoute from './routes/categoryRoute.js';

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
