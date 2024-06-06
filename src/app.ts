import express from 'express';
import verifyGitHubSignature from './middlewares/verifyGitHubSignature';
import githubRoutes from './routes/github';

const expressApp = express();

// Middleware for GitHub signature verification
expressApp.use(express.json({ verify: verifyGitHubSignature }));

// Routes
expressApp.use('/github', githubRoutes);

expressApp.get('/', (req, res) => {
  res.status(200).send('pong');
});

export default expressApp;
