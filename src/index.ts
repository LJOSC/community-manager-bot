import env from './configs/envVars';
import express from 'express';
import rootRouter from './routes';
import slackApp from './configs/slack';

const api = express();

// Routes
api.use('/', rootRouter);

const PORT = env.EXPRESS_PORT;

// Start the Express server
api.listen(PORT, () => {
  console.log(`⚡️ GitHub webhook server is running on port ${PORT}`);
});

// Initialize the slack app
(async () => {
  await slackApp.start(env.PORT);
  console.log('⚡️ Slack Bolt app is running!');
})();
