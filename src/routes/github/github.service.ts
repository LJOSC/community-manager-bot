import Format from 'src/utils/format';
import slackApp from 'src/configs/slack';
import Logger from 'src/configs/logger';
import APIError from 'src/utils/APIError';

const logger = new Logger('github.service.ts');

const SERVICES_NAMES = {
  githubStarSlackNotify: 'githubStarSlackNotify()',
};

// @ts-ignore
export async function githubStarSlackNotify(event) {
  try {
    logger.log(`[ ${SERVICES_NAMES.githubStarSlackNotify}] is called`);

    if (event.action === 'created' && event.starred_at) {
      const repo = event.repository;
      const user = event.sender;

      const message = `🌟 ${user.login} starred the repository *<${repo.html_url}|${repo.full_name}>*`;

      await slackApp.client.chat.postMessage({
        channel: process.env.SLACK_CHANNEL_ID as string,
        text: message,
      });

      return Format.success({}, 'Event received');
    } else {
      return Format.success({}, 'Event ignored');
    }
  } catch (error) {
    logger.error(`[${SERVICES_NAMES.githubStarSlackNotify}] ERROR:${error?.message || error}`);
    throw new APIError({
      status: 500,
      message: error?.message || error,
    });
  }
}
