import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Copy,
  Download,
  Eye,
  Sparkles,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Repository } from "@/types";
import { mockRepositories, mockReadmeGenerations } from "@/services/mockData";

export default function GenerateReadmePage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [template, setTemplate] = useState("standard");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const repo = mockRepositories.find((r) => r.id === id);
      setRepository(repo || null);

      const existingGeneration = mockReadmeGenerations.find(
        (g) => g.repositoryId === id && g.isActive
      );
      if (existingGeneration) {
        setGeneratedContent(existingGeneration.content);
      }
    }
  }, [id, isAuthenticated, router]);

  const handleGenerateReadme = async () => {
    if (!repository) return;
    setIsGenerating(true);

    setTimeout(() => {
      const generatedReadme = `
        # ${repository.name}${repository.description}
        ## 🚀 Features
        - Modern and responsive design
        - Built with ${repository.language}
        - Easy to use and customize
        - Comprehensive documentation
        - Active community support

        ## 📦 Installation

        \`\`\`bash
        git clone ${repository.url}
        cd ${repository.name}
        npm install
        \`\`\`

        ## 🛠️ Usage

        \`\`\`${repository.language.toLowerCase()}
        // Example usage
        import { ${repository.name} } from './${repository.name}';

        const app = new ${repository.name}();
        app.start();
        \`\`\`

        ## 🤝 Contributing

        Contributions are welcome! Please feel free to submit a Pull Request.

        1. Fork the project
        2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
        3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
        4. Push to the branch (\`git push origin feature/AmazingFeature\`)
        5. Open a Pull Request

        ## 📄 License

        This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

        ## ⭐ Show your support

        Give a ⭐️ if this project helped you!

        ## 📞 Contact

        - GitHub: [@${user?.username}](https://github.com/${user?.username})
        - Email: ${user?.email}

        ---

        Generated with ❤️ by [Readme Genie](https://readmegenie.com)
      `;
      setGeneratedContent(generatedReadme);
      setIsGenerating(false);
    }, 3000);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator?.clipboard?.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${repository?.name}-README.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (!repository) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Repository not found
            </h1>
            <Button onClick={() => router.push("/dashboard")} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[2000px] py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Generate README for {repository.name}
              </h1>
              <p className="text-gray-600">{repository.description}</p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              {repository.language}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Template
                  </label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="api">API Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerateReadme}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate README
                    </>
                  )}
                </Button>

                {user?.subscription.tier === "free" && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Free Plan:</strong> 1 README per repository.
                      <a href="#" className="underline ml-1">
                        Upgrade to Pro
                      </a>{" "}
                      for unlimited generations.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated README</CardTitle>
                  {generatedContent && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPreview(!isPreview)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {isPreview ? "Edit" : "Preview"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyToClipboard}
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  isPreview ? (
                    <div className="prose max-w-none">
                      <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{
                          __html: generatedContent
                            .replace(/\n/g, "<br>")
                            .replace(
                              /```(\w+)?\n([\s\S]*?)```/g,
                              "<pre><code>$2</code></pre>"
                            )
                            .replace(/`([^`]+)`/g, "<code>$1</code>")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\*(.*?)\*/g, "<em>$1</em>")
                            .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                            .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                            .replace(/^### (.*$)/gm, "<h3>$1</h3>"),
                        }}
                      />
                    </div>
                  ) : (
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="min-h-[500px] font-mono text-sm"
                      placeholder="Generated README will appear here..."
                    />
                  )
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Click "Generate README" to create your documentation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
