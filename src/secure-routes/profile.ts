import { Request, Response, Router, NextFunction } from 'express';

const router = Router();

router.get(
  '/profile',
  (request: Request, response: Response, next: NextFunction) => {
    response.json({
      user: request.user,
      token: request.query.secret_token,
    });
  }
);

export { router as profileRouter };
