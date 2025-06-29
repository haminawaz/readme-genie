import axios from "axios";
import jwt from "jsonwebtoken";
import { configurations } from "../config/config.js";
import User from "../models/user.js";
import Pricing from "../models/pricing.js";

export function githubLogin(req, res) {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${configurations.githubClientId}&scope=repo user:email`;
  res.redirect(redirectUri);
}

export async function githubCallback(req, res) {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: configurations.githubClientId,
        client_secret: configurations.githubClientSecret,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
    const accessToken = tokenRes.data.access_token;

    const emailRes = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    const emails = emailRes.data;
    const primaryEmail =
      emails.find((email) => email.primary && email.verified)?.email ||
      emails[0]?.email;

    let user = await User.findOne({ email: primaryEmail });

    if (user) {
      user.access_token = accessToken;
      await user.save();
    } else {
      const userRes = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });
      const { name, login, avatar_url } = userRes.data;

      user = await User.create({
        name,
        login_name: login,
        email: primaryEmail,
        profil_picture: avatar_url,
        access_token: accessToken,
      });

      await Pricing.create({
        user_id: user._id,
        plan_name: "free",
      });
    }

    const token = jwt.sign({ user_id: user._id }, configurations.jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        token,
        user: {
          name: user.name,
          email: user.email,
          avatarUrl: user.profil_picture,
        },
      },
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: err.message,
    });
  }
}

export async function getRepos(req, res) {
  const userId = req.decoded._id;
  const accessToken = req.decoded.access_token;

  try {
    const reposRes = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${accessToken}` },
    });

    const simplifyRepo = reposRes.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || "",
      language: repo.language || "Unknown",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isPrivate: repo.private,
      updatedAt: new Date(repo.updated_at),
      createdAt: new Date(repo.created_at),
      hasReadme: false, // You can update this based on API check
      readmeGenerated: false, // Your own system can flag this
      url: repo.html_url,
    }));

    const planData = await Pricing.findOne({ user_id: userId });

    return res.status(200).json({
      message: "User repositries returned successfully",
      response: {
        data: {
          repositories: simplifyRepo,
          planData: planData,
        },
      },
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: err.message,
    });
  }
}

export async function createMarkdown(req, res) {
  const { repoFullName } = req.body;
  const accessToken = req.decoded.access_token;

  try {
    const repoRes = await axios.get(
      `https://api.github.com/repos/${repoFullName}`,
      {
        headers: { Authorization: `token ${accessToken}` },
      }
    );
    const repo = repoRes.data;

    let readme = "";
    try {
      const readmeRes = await axios.get(
        `https://api.github.com/repos/${repoFullName}/readme`,
        {
          headers: { Authorization: `token ${accessToken}` },
          responseType: "json",
        }
      );
      readme = Buffer.from(readmeRes.data.content, "base64").toString("utf-8");
    } catch {}
    // Generate markdown (simple example)
    const markdown = `# ${repo.name}\n\n${
      repo.description || ""
    }\n\n## How to use\n\nClone the repo:\n\n\`\`\`bash\ngit clone ${
      repo.html_url
    }.git\n\`\`\`\n\n${readme ? "## README\n\n" + readme : ""}\n`;
    res.json({ markdown });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: err.message,
    });
  }
}
