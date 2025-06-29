import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  BarChart3,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import RepositoryCard from "@/components/RepositoryCard";
import { useAuth } from "@/contexts/AuthContext";
import { Repository } from "@/types";
import { mockRepositories } from "@/services/mockData";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [repositories, setRepositories] =
    useState<Repository[]>(mockRepositories);
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const totalRepos = repositories.length;
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);

  const handleGenerateReadme = (repository: Repository) => {
    if (user?.subscription.tier === "free" && repository.readmeGenerated) {
      alert(
        "Free tier allows only 1 README per repository. Upgrade to Pro for unlimited generations!"
      );
      return;
    }

    window.location.href = `/generate/${repository.id}`;
  };

  const filteredRepositories = repositories
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (repo) => languageFilter === "all" || repo.language === languageFilter
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "stars":
          return b.stars - a.stars;
        case "updated":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });

  const languages = Array.from(
    new Set(repositories.map((repo) => repo.language))
  );

  const generatedCount = repositories.filter(
    (repo) => repo.readmeGenerated
  ).length;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[2000px] py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-gray-600">
                Manage your repositories and generate professional README files
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              {user?.subscription.tier.charAt(0).toUpperCase() +
                user?.subscription.tier.slice(1)}{" "}
              Plan
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Repositories
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRepos}</div>
                <p className="text-xs text-muted-foreground">
                  Across all your projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  READMEs Generated
                </CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{generatedCount}</div>
                <p className="text-xs text-muted-foreground">
                  {((generatedCount / totalRepos) * 100).toFixed(1)}% of
                  repositories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Stars
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStars}</div>
                <p className="text-xs text-muted-foreground">
                  Across all repositories
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="stars">Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepositories.map((repository) => (
            <RepositoryCard
              key={repository.id}
              repository={repository}
              onGenerateReadme={handleGenerateReadme}
            />
          ))}
        </div>

        {filteredRepositories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No repositories found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
