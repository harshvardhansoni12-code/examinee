"use client";
import { HeroSection } from "../../landing-page/components/hero-section";
import { FeatureStrips } from "../../landing-page/components/feature-strips";
import { ShowcaseSection } from "../../landing-page/components/showcase-section";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, status]);

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <main>
        <HeroSection />
        <FeatureStrips />
        <ShowcaseSection />
      </main>

      {/* Simple Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Examinee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
