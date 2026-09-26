"use client";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import { InputBar } from "../../../landing-page/components/inputbar.jsx";
import LandingOptions from "../../../landing-page/components/landing-options";
import { OptionsButtons } from "../../../landing-page/components/option-buttons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sparkles, FileText, Zap, BookOpen } from "lucide-react";

export default function Dashboard() {
  const [pdf, setPdf] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/authpage");
    }
  }, [router, status]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "Student";

  return (
    <div className="min-h-screen bg-paper-grid pt-10 pb-20 px-4 sm:px-6 flex flex-col items-center">
      {/* Dashboard Top Banner */}
      <div className="w-full max-w-4xl text-center space-y-4 mb-12 mt-4">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#191919] bg-[#FFF3D6] px-4 py-1.5 text-xs font-black text-[#8A5800] shadow-brutal-sm animate-playful-float">
          <Sparkles className="w-4 h-4 fill-[#8A5800]" />
          <span>HELLO, {firstName.toUpperCase()}! 👋 READY TO ACE YOUR EXAMS?</span>
        </div>

        <div className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#191919]">
          <TypewriterEffect words={[{ text: "AI Study Assistant" }]} />
        </div>

        <p className="text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed font-semibold">
          Upload any lecture slides or PDF notes to instantly generate realistic mock exams,
          active recall flashcards, and key summaries.
        </p>
      </div>

      {/* Main Study Workspace Card */}
      <div className="w-full max-w-3xl bg-[#FFFDF9] border-3 border-[#191919] shadow-brutal-lg rounded-[2.5rem] p-6 sm:p-10 mb-14 relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#E85B9C] border-b-2 border-[#191919]" />

        <div className="flex flex-col items-center space-y-8 relative z-10 pt-2">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE7F1] border border-[#191919] text-[#C93678] text-[11px] font-black uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#191919] tracking-tight">
              Process Study Material
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#6B6B6B] mt-1">
              Select your document and choose what you want to generate
            </p>
          </div>

          <div className="w-full flex justify-center">
            <InputBar pdf={pdf} setPdf={setPdf} disabled={isProcessing} />
          </div>

          <div className="w-full flex justify-center pt-1">
            <OptionsButtons
              pdf={pdf}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2EB] border border-[#191919] text-[#191919] text-[11px] font-black uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#E85B9C]" />
            <span>Study Archive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#191919] tracking-tight">
            Quick Access
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#6B6B6B] mt-1">
            Jump back into your saved mock tests, cards, and summaries
          </p>
        </div>

        <LandingOptions
          disabled={isProcessing}
          onNavigate={() => setIsProcessing(true)}
        />
      </div>
    </div>
  );
}
