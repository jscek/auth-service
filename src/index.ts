import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { mongoConfig } from '@stvsh/commons/config/mongo';
import { expressConfig } from '@stvsh/commons/config/express';
import { errorHandler } from './middlewares/error-handler';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

require('./auth');

const app = express();
app.use(urlencoded({ extended: false }));

const main = async () => {
  console.log('Connecting to database');

  await mongoose.connect(mongoConfig.connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: mongoConfig.dbName,
    user: mongoConfig.user,
    pass: mongoConfig.password,
  });

  console.log('Connected');
  app.use(signUpRouter);
  app.use(signInRouter);
  app.use(signOutRouter);

  app.use(errorHandler);

  app.listen(expressConfig.port, () => {
    console.log(`App listening on :${expressConfig.port}`);
  });
};

main();
