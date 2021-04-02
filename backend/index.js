import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/middlewares.js';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import cateRoute from './routes/cateRoute.js';
import subRoute from './routes/subRoute.js';
import productRoute from './routes/productRoute.js';
import cloundinaryRoute from './routes/cloundinary.js';
import variationRoute from './routes/Variation.js';
import sizeRoute from './routes/SizeRoute.js';
import cartRoute from './routes/CartRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();

connectDB();

app.use(cors());

app.use(express.json());

const __dirname = path.resolve()
app.use('/public', express.static('public'));


app.use('/api', userRoute);
app.use('/api', cateRoute);
app.use('/api', subRoute);
app.use('/api', productRoute);
app.use('/api', cloundinaryRoute);
app.use('/api', variationRoute);
app.use('/api', sizeRoute);
app.use('/api', cartRoute);

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}`))