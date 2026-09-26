"use client";
import { HeroSection } from "../../landing-page/components/hero-section";
import { FeatureStrips } from "../../landing-page/components/feature-strips";
import { ShowcaseSection } from "../../landing-page/components/showcase-section";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

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
    <div className="min-h-screen bg-paper-grid font-sans selection:bg-[#FCE7F1] selection:text-[#C93678] overflow-x-hidden">
      <main>
        <HeroSection />
        <FeatureStrips />
        <ShowcaseSection />
      </main>

      {/* Playful Footer */}
      <footer className="w-full bg-[#FFFDF9] border-t-2 border-[#191919] text-[#191919] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E85B9C] border-2 border-[#191919] flex items-center justify-center text-white font-extrabold shadow-brutal-sm">
              <Sparkles className="w-4 h-4 fill-white" />
            </div>
            <div className="text-xl font-black text-[#191919]">
              EXAM<span className="text-[#E85B9C]">INEE</span>
            </div>
          </div>

          <p className="text-xs font-bold text-[#6B6B6B] flex items-center gap-1.5">
            Crafted for curious minds and ambitious students. &copy; {new Date().getFullYear()} Examinee.
          </p>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#F5F2EB] border border-[#191919] text-[11px] font-bold text-[#191919]">
              ✦ Study Smarter, Not Harder
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
