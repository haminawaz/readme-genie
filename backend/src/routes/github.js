const express = require("express");
const router = express.Router();
const githubController = require("../controllers/github.js");
const { verifyUserToken } = require("../middlewares/auth.js");

router.get("/login", githubController.githubLogin);
router.get("/callback", githubController.githubCallback);
router.get("/repos", verifyUserToken, githubController.getRepos);
router.post("/markdown", githubController.createMarkdown);

module.exports = router;
