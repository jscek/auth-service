import express, { json, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { errorHandler } from './middlewares/error-handler';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { profileRouter } from './secure-routes/profile';

//* Change sourcing this file
require('./auth');

const app = express();

const main = async () => {
  console.log('Connecting to database');

  await mongoose.connect('mongodb://root:rootpassword@mongo:27017/auth?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log('Connected');

  app.use(signUpRouter);
  app.use(signInRouter);
  app.use(signOutRouter);

  app.use('/user', passport.authenticate('jwt', { session: false }), profileRouter);

  app.use(errorHandler);

  app.listen(3000, () => {
    console.log('App listening on :3000');
  });
};

main();
