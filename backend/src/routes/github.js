const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github');

router.get('/login', githubController.githubLogin);
router.get('/callback', githubController.githubCallback);
router.get('/repos', githubController.getRepos);
router.post('/markdown', githubController.createMarkdown);

module.exports = router;
