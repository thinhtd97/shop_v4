import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/middlewares.js';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import cateRoute from './routes/cateRoute.js';
import subRoute from './routes/subRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api', userRoute);
app.use('/api', cateRoute);
app.use('/api', subRoute);

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}`))