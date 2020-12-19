import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hi', (req: Request, res: Response) => {
  res.send('hi');
});

export { router };
