import { Repository } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Lock, FileText, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RepositoryCardProps {
  repository: Repository;
  onGenerateReadme: (repository: Repository) => void;
}

export default function RepositoryCard({ repository, onGenerateReadme }: RepositoryCardProps) {
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-600",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-600",
      Dart: "bg-cyan-600",
      Java: "bg-orange-600",
      Go: "bg-cyan-500",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {repository.name}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">
              {repository.description || "No description available"}
            </p>
          </div>
          {repository.isPrivate && (
            <Lock className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {repository.language && (
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`} />
                <span>{repository.language}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{repository.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-3 w-3" />
              <span>{repository.forks}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {repository.hasReadme && (
              <Badge variant="secondary" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Has README
              </Badge>
            )}
            {repository.readmeGenerated && (
              <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Generated
              </Badge>
            )}
          </div>
          <span className="text-xs text-gray-500">
            Updated {formatDistanceToNow(repository.updatedAt, { addSuffix: true })}
          </span>
        </div>

        <Button 
          onClick={() => onGenerateReadme(repository)}
          className="w-full"
          disabled={repository.readmeGenerated}
        >
          {repository.readmeGenerated ? "README Generated" : "Generate README"}
        </Button>
      </CardContent>
    </Card>
  );
}