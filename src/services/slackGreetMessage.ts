import { App } from '@slack/bolt';
import env from 'src/configs/envVars';
import Logger from 'src/configs/logger';

const logger = new Logger('slackGreetMessage.ts');

const greetEventsSetup = (slackApp: App) => {
  slackApp.event('team_join', async ({ event, client }) => {
    try {
      const sendChannelGreeting = client.chat.postMessage({
        channel: env.SLACK_INTRODUCTIONS_CHANNEL_ID,
        text: `Welcome to the *LJOSC* Community, <@${event.user.name}>! :tada: We're glad to have you here. Feel free to introduce yourself here.`,
      });

      const sendChannelRulesDM = client.chat.postMessage({
        channel: event.user.id,
        text: `
        *Community Rules*
  
        1. *Respectful Communication*: Treat everyone with respect. No harassment, discrimination, or offensive language will be tolerated.
        2. *Constructive Feedback*: Offer constructive criticism and be open to receiving it. Aim to help others improve.
        3. *Stay On Topic*: Keep discussions relevant to the project. Off-topic conversations should be taken elsewhere.
        4. *No Spam*: Avoid spamming the community with irrelevant messages, links, or advertisements.
        5. *Collaboration and Sharing*: Share knowledge and collaborate with others. Acknowledge contributions from others.
        6. *Follow Licensing Rules*: Respect the licensing terms of the project and any third-party dependencies.
        7. *Report Issues Appropriately*: Use the issue tracker to report bugs or request features, following the provided templates and guidelines.
        8. *Privacy*: Respect the privacy of community members. Do not share private information without consent.
        9. *Inclusive Environment*: Foster an inclusive environment where everyone feels welcome, regardless of background or identity.
        10. *Compliance*: Follow all applicable laws and the terms of service of any platforms used by the community.
        11. *Offensive Names*: Do not use offensive or inappropriate usernames. Names should be respectful and professional.
        12. *External Links*: Share external links only if they are relevant to the discussion. Ensure links are safe, appropriate, and comply with community guidelines.
  
        *Note: Members who break these rules may be warned or banned from the community.*
        `,
      });

      await Promise.all([sendChannelGreeting, sendChannelRulesDM]);

      logger.log(`Greet message sent to ${event.user.name}`);
    } catch (error) {
      logger.error(`Error sending greet message to ${event?.user?.name}: ${error}`);
    }
  });
};

export default greetEventsSetup;
