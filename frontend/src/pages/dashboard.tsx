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

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [repositories, setRepositories] = useState<Repository[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState({
    plan_name: "",
    max_generated: 0,
    generated: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleGenerateReadme = (repository: Repository) => {
    if (planData?.max_generated <= planData?.generated) {
      alert(
        "Free tier allows only 1 README per repository. Upgrade to Pro for unlimited generations!"
      );
      return;
    }

    window.location.href = `/generate/${repository.id}`;
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/api/v1/github/repos", {
          headers: {
            Authorization: token,
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching repos: ${res.statusText}`);
        }

        const response = await res.json();
        const data: Repository[] = response.response.data.repositories;
        setRepositories(data);
        setPlanData(response.response.data.planData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [isAuthenticated]);

  const filteredRepositories = Array.isArray(repositories)
    ? repositories.filter((repo) => {
        const term = searchTerm.toLowerCase();
        return (
          repo.name.toLowerCase().includes(term) ||
          repo.description.toLowerCase().includes(term)
        );
      })
    : [];

  const totalRepos = filteredRepositories?.length;
  const totalStars = Array.isArray(filteredRepositories)
    ? filteredRepositories.reduce((sum, repo) => sum + repo.stars, 0)
    : 0;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[2000px] py-8">
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading repositories...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-600">
            <p>Error: {error}</p>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-gray-600">
                    Manage your repositories and generate professional README
                    files
                  </p>
                </div>
                <Badge variant="secondary" className="px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {planData?.plan_name?.charAt(0).toUpperCase() +
                    planData?.plan_name?.slice(1)}{" "}
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
                    <div className="text-2xl font-bold">{planData.generated}</div>
                    <p className="text-xs text-muted-foreground">
                      {((planData.generated / totalRepos) * 100).toFixed(1)}% of
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
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(filteredRepositories) &&
                filteredRepositories.map((repository) => (
                  <RepositoryCard
                    key={repository.id}
                    repository={repository}
                    onGenerateReadme={handleGenerateReadme}
                  />
                ))}
            </div>

            {filteredRepositories?.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No repositories found
                </h3>
                <p className="text-gray-600">Try adjusting your search</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
