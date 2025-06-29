import { ReadmeGeneration } from "@/types";

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