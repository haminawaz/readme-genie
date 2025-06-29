import { post, get } from "axios";
import { sign, verify } from "jsonwebtoken";
import { configurations } from "../config/config";

export function githubLogin(req, res) {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${configurations.githubClientId}&scope=repo`;
  res.redirect(redirectUri);
}

// Step 2: GitHub callback to exchange code for access token
export async function githubCallback(req, res) {
  const code = req.query.code;
  try {
    const tokenRes = await post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: configurations.githubClientId,
        client_secret: configurations.githubClientSecret,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
    const accessToken = tokenRes.data.access_token;
    // Issue JWT for session
    const token = sign({ accessToken }, configurations.jwtSecret, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "GitHub OAuth failed", error: err.message });
  }
}

// Step 3: Get all repos for the authenticated user
export async function getRepos(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  try {
    const { accessToken } = verify(
      authHeader.split(" ")[1],
      configurations.jwtSecret
    );
    const reposRes = await get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${accessToken}` },
    });
    res.json(reposRes.data);
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
}

// Step 4: Generate markdown documentation for a repo
export async function createMarkdown(req, res) {
  const { repoFullName } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  try {
    const { accessToken } = verify(
      authHeader.split(" ")[1],
      configurations.jwtSecret
    );
    // Fetch repo details
    const repoRes = await get(`https://api.github.com/repos/${repoFullName}`, {
      headers: { Authorization: `token ${accessToken}` },
    });
    const repo = repoRes.data;
    // Fetch README if exists
    let readme = "";
    try {
      const readmeRes = await get(
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
    res
      .status(500)
      .json({ message: "Failed to generate markdown", error: err.message });
  }
}
