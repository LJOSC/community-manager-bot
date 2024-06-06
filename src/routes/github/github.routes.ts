import express from 'express';
import env from '../../configs/envVars';
import verifyGitHubSignature from '../../middlewares/verifyGitHubSignature';
import slackApp from 'src/configs/slack';

const githubRouter = express.Router();

githubRouter.use(
  express.json({
    verify: (req: express.Request & { rawBody?: Buffer }, _, buf) => {
      req.rawBody = buf;
    },
  }),
);

// Send a message to Slack when a user stars a GitHub repository
githubRouter.post('/github-stars', verifyGitHubSignature, async (req, res) => {
  const event = req.body;

  if (event.action === 'created' && event.starred_at) {
    const repo = event.repository;
    const user = event.sender;

    try {
      const message = `🌟 ${user.login} starred the repository *<${repo.html_url}|${repo.full_name}>*`;

      await slackApp.client.chat.postMessage({
        channel: env.SLACK_CHANNEL_ID,
        text: message,
      });

      res.status(200).send('Event received');
    } catch (error) {
      console.error('Error sending message to Slack:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(200).send('Event ignored');
  }
});

export default githubRouter;
