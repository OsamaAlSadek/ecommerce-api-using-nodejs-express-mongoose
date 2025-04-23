import { readFileSync } from 'fs';
import dbConnection from '../../config/database.js';
import productModel from '../../models/productModel.js';

process.loadEnvFile('../../.env');

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(readFileSync('./products.json'));

// Insert data into DB
const insertData = async () => {
  try {
    await productModel.create(products);

    console.log('✅ Data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await productModel.deleteMany();
    console.log('🗑️  Data destroyed successfully.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
