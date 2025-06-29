export interface User {
  id: string;
  githubId: string;
  username: string;
  email: string;
  avatarUrl: string;
  subscription: {
    tier: "free" | "pro" | "enterprise";
    expiresAt?: Date;
    features: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  updatedAt: Date;
  createdAt: Date;
  hasReadme: boolean;
  readmeGenerated: boolean;
  url: string;
}

export interface ReadmeGeneration {
  id: string;
  userId: string;
  repositoryId: string;
  repositoryName: string;
  content: string;
  template: string;
  generatedAt: Date;
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}