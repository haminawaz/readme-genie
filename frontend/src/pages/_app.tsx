import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>ReadME Genie | AI ReadMe Generator for GitHub Repositries</title>
        <meta
          name="description"
          content="Generate stunning, AI-powered README files for GitHub projects in the healthcare and tech industry. Boost project clarity, attract contributors, and improve SEO effortlessly."
        />
        <meta
          name="keywords"
          content="AI ReadMe generator, GitHub documentation tool, healthcare marketing, open source SEO, medical software documentation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          property="og:title"
          content="ReadME Genie | AI ReadMe Generator"
        />
        <meta
          property="og:description"
          content="AI-powered README generation tool for healthcare marketing and tech documentation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReadME Genie" />
        <meta
          name="twitter:description"
          content="Generate professional README files with AI for your GitHub projects in healthcare and beyond."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
