import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';

passport.use(
  'signup',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// ...

passport.use(
  'signin',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(new Error('User not found'), false);
        }

        const validate = await user.validatePassword(password);

        if (!validate) {
          return done(new Error('Wrong password'), false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
