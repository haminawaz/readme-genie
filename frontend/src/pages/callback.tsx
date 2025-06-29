import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";

export default function GithubCallback() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const code = router.query.code as string;

    if (code) {
      setLoading(true);
      fetch(`http://localhost:3001/api/v1/github/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Verification failed");
          return res.json();
        })
        .then((data) => {
          console.log("Verification success:", data);
          localStorage.setItem(
            "readme-genie-user",
            JSON.stringify(data.data.user)
          );
          localStorage.setItem("token", JSON.stringify(data.data.token));
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [router.query.code]);

  if (isAuthenticated) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <>
      <Head>
        <title>Verifying GitHub Login...</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-white">
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-700">
              Verifying your GitHub login...
            </p>
          </div>
        )}
      </main>
    </>
  );
}
