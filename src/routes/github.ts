import express from 'express';
import { App } from '@slack/bolt';
import env from '../configs/envVars';

const router = express.Router();

const app = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET
});

const slackChannelId = env.SLACK_CHANNEL_ID;

// Send a message to Slack when a user stars a GitHub repository
router.post('/github-stars', async (req, res) => {
  const event = req.body;

  if (event.action === 'created' && event.starred_at) {
    const repo = event.repository;
    const user = event.sender;

    try {
      const message = `🌟 ${user.login} starred the repository *<${repo.html_url}|${repo.full_name}>*`;

      await app.client.chat.postMessage({
        channel: slackChannelId,
        text: message
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

export default router;
