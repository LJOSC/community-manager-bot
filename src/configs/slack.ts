import { App } from '@slack/bolt';
import env from './envVars';

const slackApp = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET,
});

export default slackApp;
