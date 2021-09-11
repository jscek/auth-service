import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.post(
  '/auth/signup',
  passport.authenticate('signup', { session: false }),
  async (request: Request, response: Response) => {
    response.json({
      user: request.user,
    });
  }
);

export { router as signUpRouter };
