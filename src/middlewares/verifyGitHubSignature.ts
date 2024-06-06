import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import env from '../configs/envVars';

interface IRequest extends Request {
  rawBody?: Buffer;
}

// Middleware to verify GitHub signature
const verifyGitHubSignature = (req: IRequest, res: Response, next: NextFunction): void => {
  if (!req.rawBody) {
    return next('Request body empty');
  }
  const githubWebhookSecret = env.GITHUB_WEBHOOK_SECRET;
  const signature = req.headers['x-hub-signature-256'] as string;

  if (!signature) {
    res.status(401).send('Signature not found');
    return;
  }

  const buf = req.rawBody;
  const hmac = crypto.createHmac('sha256', githubWebhookSecret);
  const digest = 'sha256=' + hmac.update(buf).digest('hex');

  if (signature !== digest) {
    res.status(401).send('Invalid signature');
    return;
  }

  next();
};

export default verifyGitHubSignature;
