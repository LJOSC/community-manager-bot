import { Router } from 'express';
import githubRouter from './github/github.routes';

const rootRouter = Router();

rootRouter.get('/', (_, res) => {
  res.status(200).send('pong');
});

rootRouter.use('/github', githubRouter);

export default rootRouter;
