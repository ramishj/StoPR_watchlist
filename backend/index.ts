import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import authRoutes from './routes/authRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import { errorHandler } from './utils/errorHandler';
const cors = require("cors");

const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

// Error handler middleware
app.use(errorHandler);



mongoose.Promise = global.Promise; // Set Mongoose to use the global Promise constructor

mongoose.connect('mongodb+srv://ramishjamal:ramish2002@cluster0.xl7rkhg.mongodb.net/stopr', {
  useNewUrlParser: true,
  useUnifiedTopology: true // Add this option
})
.then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
})
.catch(err => console.error(err));


