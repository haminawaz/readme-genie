import { User, Repository, ReadmeGeneration } from "@/types";

export const mockUser: User = {
  id: "1",
  githubId: "12345",
  username: "johndoe",
  email: "john@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  subscription: {
    tier: "free",
    features: ["basic-templates", "1-readme-per-repo"],
  },
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date(),
};

export const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "awesome-project",
    fullName: "johndoe/awesome-project",
    description: "A really awesome project that does amazing things",
    language: "TypeScript",
    stars: 245,
    forks: 32,
    isPrivate: false,
    updatedAt: new Date("2024-06-20"),
    createdAt: new Date("2024-01-10"),
    hasReadme: true,
    readmeGenerated: false,
    url: "https://github.com/johndoe/awesome-project",
  },
  {
    id: "2",
    name: "react-components",
    fullName: "johndoe/react-components",
    description: "Reusable React components library",
    language: "JavaScript",
    stars: 89,
    forks: 12,
    isPrivate: false,
    updatedAt: new Date("2024-06-15"),
    createdAt: new Date("2024-02-05"),
    hasReadme: false,
    readmeGenerated: true,
    url: "https://github.com/johndoe/react-components",
  },
  {
    id: "3",
    name: "api-server",
    fullName: "johndoe/api-server",
    description: "RESTful API server built with Node.js and Express",
    language: "JavaScript",
    stars: 156,
    forks: 28,
    isPrivate: true,
    updatedAt: new Date("2024-06-25"),
    createdAt: new Date("2024-03-12"),
    hasReadme: true,
    readmeGenerated: false,
    url: "https://github.com/johndoe/api-server",
  },
  {
    id: "4",
    name: "python-scripts",
    fullName: "johndoe/python-scripts",
    description: "Collection of useful Python automation scripts",
    language: "Python",
    stars: 67,
    forks: 8,
    isPrivate: false,
    updatedAt: new Date("2024-06-10"),
    createdAt: new Date("2024-04-20"),
    hasReadme: false,
    readmeGenerated: false,
    url: "https://github.com/johndoe/python-scripts",
  },
  {
    id: "5",
    name: "mobile-app",
    fullName: "johndoe/mobile-app",
    description: "Cross-platform mobile application",
    language: "Dart",
    stars: 203,
    forks: 45,
    isPrivate: false,
    updatedAt: new Date("2024-06-22"),
    createdAt: new Date("2024-05-01"),
    hasReadme: true,
    readmeGenerated: false,
    url: "https://github.com/johndoe/mobile-app",
  },
];

export const mockReadmeGenerations: ReadmeGeneration[] = [
  {
    id: "1",
    userId: "1",
    repositoryId: "2",
    repositoryName: "react-components",
    content: `# React Components Library

A comprehensive collection of reusable React components built with TypeScript and styled with Tailwind CSS.

## Features

- 🎨 Modern and responsive design
- 📱 Mobile-first approach
- 🔧 TypeScript support
- 🎯 Fully customizable
- 📚 Comprehensive documentation

## Installation

\`\`\`bash
npm install react-components-lib
\`\`\`

## Usage

\`\`\`jsx
import { Button, Card } from 'react-components-lib';

function App() {
  return (
    <Card>
      <Button variant="primary">Click me!</Button>
    </Card>
  );
}
\`\`\`

## Components

- Button
- Card
- Input
- Modal
- Dropdown
- And many more...

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.`,
    template: "standard",
    generatedAt: new Date("2024-06-15"),
    isActive: true,
  },
];