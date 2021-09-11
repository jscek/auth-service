import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
  '/auth/signin',
  async (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('signin', async (authError, user, info) => {
      try {
        if (authError) {
          return next(authError);
        }

        request.login(user, { session: false }, async (loginError) => {
          if (loginError) {
            return next(loginError);
          }

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');

          return response.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(request, response, next);
  }
);

export { router as signInRouter };
