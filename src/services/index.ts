import { App } from '@slack/bolt';
import greetEventsSetup from './slackGreetMessage';

const initializeSlackEvents = (slackApp: App) => {
  greetEventsSetup(slackApp);
};

export default initializeSlackEvents;
