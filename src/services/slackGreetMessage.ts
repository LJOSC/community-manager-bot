import { App } from '@slack/bolt';
import env from 'src/configs/envVars';
import Logger from 'src/configs/logger';

const logger = new Logger('slackGreetMessage.ts');

const greetEventsSetup = (slackApp: App) => {
  slackApp.event('team_join', async ({ event, client }) => {
    try {
      await client.chat.postMessage({
        channel: env.SLACK_INTRODUCTIONS_CHANNEL_ID,
        text: `Welcome to the *LJOSC* Community, <@${event.user.name}>! :tada: We're glad to have you here. Feel free to introduce yourself here.`,
      });
      logger.log(`Greet message sent to ${event.user.name}`);
    } catch (error) {
      logger.error(`Error sending greet message to ${event?.user?.name}: ${error}`);
    }
  });
};

export default greetEventsSetup;
