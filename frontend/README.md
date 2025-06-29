# Readme Genie 📝✨

A powerful web application that automatically generates professional README files for your GitHub repositories using AI-powered analysis and customizable templates.

## Overview

Readme Genie streamlines the process of creating comprehensive README files by analyzing your GitHub repositories and generating tailored documentation. Users authenticate via GitHub OAuth, select repositories from their dashboard, and generate professional README files with a single click.

## Requirements

### Technical Stack
- **Frontend**: Next.js 15 (Page Router), TypeScript, React 18+
- **Styling**: Tailwind CSS, Shadcn/UI Components
- **Authentication**: GitHub OAuth 2.0
- **Database**: MongoDB (for user data and generation history)
- **APIs**: GitHub REST API v4, OpenAI API (for README generation)
- **Deployment**: Vercel/Netlify compatible
- **Node.js**: Version 18.0.0 or higher
- **Package Manager**: npm or yarn

### External Services
- GitHub OAuth Application (Client ID & Secret)
- MongoDB Database (Atlas or self-hosted)
- OpenAI API Key (for AI-powered README generation)

## Installation

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/your-username/readme-genie.git
cd readme-genie

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/readme-genie

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Application Configuration
NODE_ENV=development
```

### 3. GitHub OAuth Setup
1. Navigate to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - **Application name**: Readme Genie
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy Client ID and Client Secret to your `.env.local` file

### 4. MongoDB Setup
1. Create a MongoDB Atlas account or set up local MongoDB
2. Create a new database named `readme-genie`
3. Add your connection string to `.env.local`

### 5. Run the Application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Linting and type checking
npm run lint
npm run type-check
```

## Features

### 🔐 GitHub Authentication
- **OAuth Integration**: Secure login using GitHub accounts
- **Token Management**: Stores access tokens for repository access
- **User Profiles**: Saves user information and preferences
- **Session Management**: Persistent login sessions with automatic refresh

### 📊 Repository Dashboard
- **Repository Listing**: Displays all user repositories with metadata
- **Search & Filter**: Find repositories by name, language, or date
- **Repository Details**: Shows stars, forks, language, and last update
- **Generation Status**: Tracks which repositories have generated READMEs
- **Sorting Options**: Sort by name, stars, last updated, or creation date

### 🤖 AI-Powered README Generation
- **Intelligent Analysis**: Analyzes repository structure, code, and existing documentation
- **Template Selection**: Multiple professional README templates
- **Custom Sections**: Automatically generates relevant sections (Installation, Usage, API, etc.)
- **Language Detection**: Adapts content based on primary programming language
- **Markdown Formatting**: Properly formatted markdown with syntax highlighting

### 📋 Copy & Export Features
- **One-Click Copy**: Copy generated README to clipboard
- **Download Options**: Export as .md file or PDF
- **Preview Mode**: Live preview of rendered markdown
- **Edit Capability**: Make manual adjustments before copying

### 💎 Tier-Based Access Control
- **Free Tier**: 
  - 1 README generation per repository
  - Basic templates
  - Standard support
- **Pro Tier**: 
  - Unlimited generations
  - Premium templates
  - Custom branding
  - Priority support
- **Enterprise Tier**: 
  - Team collaboration
  - API access
  - Custom integrations
  - Dedicated support

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching with system preference detection
- **Loading States**: Smooth loading animations and progress indicators
- **Error Handling**: Comprehensive error messages and recovery options
- **Accessibility**: WCAG 2.1 AA compliant interface

## API Endpoints

### Authentication
- `GET /api/auth/signin` - GitHub OAuth login
- `GET /api/auth/callback/github` - OAuth callback handler
- `POST /api/auth/signout` - User logout

### Repositories
- `GET /api/repositories` - Fetch user repositories
- `GET /api/repositories/[id]` - Get specific repository details

### README Generation
- `POST /api/generate-readme` - Generate README for repository
- `GET /api/readme-history` - Get generation history
- `DELETE /api/readme-history/[id]` - Delete generation record

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/subscription` - Get subscription status

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  githubId: String,
  username: String,
  email: String,
  avatarUrl: String,
  accessToken: String (encrypted),
  subscription: {
    tier: String, // 'free', 'pro', 'enterprise'
    expiresAt: Date,
    features: Array
  },
  createdAt: Date,
  updatedAt: Date
}
```

### README Generations Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  repositoryId: String,
  repositoryName: String,
  content: String,
  template: String,
  generatedAt: Date,
  isActive: Boolean
}
```

## Future Enhancements

### Version 2.0 Features
- **Collaborative Editing**: Real-time collaboration on README files
- **Version Control**: Track README changes and maintain history
- **Integration Hub**: Connect with popular development tools (Slack, Discord, Jira)
- **Analytics Dashboard**: Track README performance and engagement
- **Custom Templates**: User-created and community-shared templates

### Premium Features
- **AI Writing Assistant**: Advanced AI suggestions for content improvement
- **Multi-language Support**: Generate READMEs in different languages
- **Brand Customization**: Custom logos, colors, and styling
- **Bulk Operations**: Generate READMEs for multiple repositories
- **API Access**: RESTful API for programmatic access

### Enterprise Features
- **Team Management**: Organization-wide README standards and templates
- **Approval Workflows**: Review and approval process for README changes
- **Compliance Tools**: Ensure READMEs meet organizational standards
- **Advanced Analytics**: Detailed insights and reporting
- **Custom Integrations**: Tailored integrations with enterprise tools

### Monetization Strategy
- **Freemium Model**: Free tier with limited features, paid upgrades
- **Subscription Tiers**: Monthly/annual billing with feature differentiation
- **Enterprise Licensing**: Custom pricing for large organizations
- **API Usage**: Pay-per-use model for API access
- **Professional Services**: Custom template creation and consulting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [docs.readmegenie.com](https://docs.readmegenie.com)
- **Community**: [Discord Server](https://discord.gg/readmegenie)
- **Issues**: [GitHub Issues](https://github.com/your-username/readme-genie/issues)
- **Email**: support@readmegenie.com

---

Built with ❤️ by the Readme Genie Team