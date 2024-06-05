const express = require('express');
const verifyGitHubSignature = require('./middlewares/verifyGitHubSignature');
const githubRoutes = require('./routes/github');

const expressApp = express();

// Middleware for GitHub signature verification
expressApp.use(express.json({ verify: verifyGitHubSignature }));

// Routes
expressApp.use('/github', githubRoutes);

expressApp.get('/', (req, res) => {
  res.status(200).send('pong');
});

module.exports = expressApp;
