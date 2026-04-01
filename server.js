import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './data/database.js';

import passport from './utilities/passport.js';
import authRoutes from './routes/authRoute.js';
import router from './routes/index.js';

dotenv.config();

const app = express();

app.enable('trust proxy');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production'
    }
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router); 
app.use('/auth', authRoutes);

connectDB()
    .then((database) => {
        app.locals.db = database;
        console.log("✅ Database linked to app.locals.db");
    });

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