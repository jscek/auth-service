import { Router, Request, Response } from 'express';

const router = Router();

router.get('/auth/sign-out', async (request: Request, response: Response) => {
  response.send('sign out');
});

export { router as signOutRouter };
