require('dotenv').config(); // Load environment variables from .env file
import env from "./src/configs/envVars";
import expressApp from './src/app';

const PORT = env.EXPRESS_PORT;

// Start the Express server
expressApp.listen(PORT, () => {
  console.log(`⚡️ GitHub webhook server is running on port ${PORT}`);
});

// Start the Slack app
const { App } = require('@slack/bolt');
const slackApp = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET
});

(async () => {
  await slackApp.start(env.PORT);
  console.log('⚡️ Slack Bolt app is running!');
})();
