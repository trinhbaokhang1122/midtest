import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import routes from './routes/index.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error: ', err))

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})