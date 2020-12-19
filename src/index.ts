import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';

const app = express();
app.use(router);

app.listen(3333, () => {
  console.log('listening at 3333');
});
