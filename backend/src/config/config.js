import { config } from "dotenv";
config();

export const configurations = {
  port: process.env.PORT,
  apiVersion: process.env.API_VERSION,
  jwtSecret: process.env.JWT_SECRET,
  salt: Number(process.env.SALT),
  mongoUri: process.env.MONGODB_URI,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminEmailPassword: process.env.ADMIN_EMAIL_PASSWORD,
};
