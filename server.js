require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/subscribers', { useNewUrlParser: true, useUnifiedTopology: true }).
    catch(error => handleError(error));


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(3000, () => console.log('Server Started'));