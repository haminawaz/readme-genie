import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Sparkles,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { login, isAuthenticated } = useAuth();

  const handleGitHubLogin = () => {
    login();
  };

  if (isAuthenticated) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[2000px]">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered README Generation
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Generate Professional
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                READMEs{" "}
              </span>
              in Seconds
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your GitHub repositories with AI-generated
              documentation. Create comprehensive, professional README files
              that showcase your projects perfectly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={handleGitHubLogin}
              >
                <Github className="h-5 w-5 mr-2" />
                Get Started with GitHub
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Free to start
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Instant setup
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Readme Genie?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make your documentation shine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-2">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate comprehensive README files in seconds, not hours. Our
                  AI analyzes your code and creates perfect documentation
                  instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl mb-2">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced AI understands your project structure, dependencies,
                  and code patterns to create contextually relevant
                  documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your code stays private. We only access repository metadata
                  needed for documentation generation. No code is stored or
                  shared.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <p className="text-gray-600">Perfect for getting started</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>1 README per repository</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Basic templates</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>GitHub integration</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Community support</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-blue-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$9</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited README generations</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Premium templates</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Custom branding</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Advanced AI features</span>
                </div>
                <Button className="w-full mt-6">Upgrade to Pro</Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$29</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Team collaboration</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>API access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Custom integrations</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Dedicated support</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[2000px]">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RG</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Readme Genie
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Generate professional README files for your GitHub repositories
              with AI
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Readme Genie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
