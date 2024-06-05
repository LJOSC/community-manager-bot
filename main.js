require('dotenv').config(); // Load environment variables from .env file
const expressApp = require('./src/app');

const PORT = process.env.EXPRESS_PORT || 3002;

// Start the Express server
expressApp.listen(PORT, () => {
  console.log(`⚡️ GitHub webhook server is running on port ${PORT}`);
});

// Start the Slack app
const { App } = require('@slack/bolt');
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
  await slackApp.start(process.env.PORT || 3004);
  console.log('⚡️ Slack Bolt app is running!');
})();
