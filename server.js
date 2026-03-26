import express from 'express';
import dotenv from 'dotenv';
import connectDB from './data/database.js';
import router from './routes/index.js';

dotenv.config();
const app = express();

connectDB()
    .then((database) => {
        app.locals.db = database;
        console.log("✅ Database linked to app.locals.db");
    });

app.use(express.json());
app.use('/', router); 

// Error handling
app.use((req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`Error at: "${req.originalUrl}":`, err);

  let message;
  if (status === 404) {
    message = err.message;
  } else if (status === 500) {
    message = 'Our servers ran into a problem. Please try again in a few minutes.';
  } else {
    message = err.message || 'Oh no! There was a crash.';
  }

  res.status(status).json({
    error: {
      status: status,
      message: message
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
});