require('dotenv').config();

export const configurations = {
  port: process.env.PORT || 3001,
  apiVersion: process.env.API_VERSION || 'v1',
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
  salt: Number(process.env.SALT) || 10,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/readmegenie',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminEmailPassword: process.env.ADMIN_EMAIL_PASSWORD || '',
};
