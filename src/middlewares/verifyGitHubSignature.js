const crypto = require('crypto');

const verifyGitHubSignature = (req, res, buf, encoding) => {
  const githubWebhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    return res.status(401).send('Signature not found');
  }

  const hmac = crypto.createHmac('sha256', githubWebhookSecret);
  const digest = 'sha256=' + hmac.update(buf).digest('hex');

  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
  }
};

module.exports = verifyGitHubSignature;
