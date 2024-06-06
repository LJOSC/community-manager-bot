import express from 'express';
import verifyGitHubSignature from '../../middlewares/verifyGitHubSignature';
import * as githubController from './github.controller';

const githubRouter = express.Router();

githubRouter.use(
  express.json({
    verify: (req: express.Request & { rawBody?: Buffer }, _, buf) => {
      req.rawBody = buf;
    },
  }),
);

// Send a message to Slack when a user stars a GitHub repository
githubRouter.post('/github-stars', verifyGitHubSignature, githubController.githubStarSlackNotify);

export default githubRouter;
