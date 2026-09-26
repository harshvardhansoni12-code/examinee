"use client";
import { BarChart3, Sparkles, TrendingUp, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Performance() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-paper-grid pt-10 pb-16 px-4 sm:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#191919] bg-[#FFF3D6] px-4 py-1.5 text-xs font-black text-[#8A5800] shadow-brutal-sm mb-4 animate-playful-float">
          <Sparkles className="w-4 h-4 fill-[#8A5800]" />
          <span>PERFORMANCE & ANALYTICS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#191919] mb-8 tracking-tight">
          Performance Analytics
        </h1>

        <div className="bg-[#FFFDF9] rounded-[2.5rem] shadow-brutal-lg border-3 border-[#191919] p-8 sm:p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#FCE7F1] border-2 border-[#191919] rounded-2xl flex items-center justify-center mb-6 shadow-brutal-sm">
            <BarChart3 className="w-8 h-8 text-[#C93678]" />
          </div>

          <div className="inline-block px-3 py-1 bg-[#F5F2EB] border border-[#191919] rounded-full text-xs font-black text-[#191919] uppercase tracking-wider mb-3">
            ✦ Coming Very Soon
          </div>

          <h2 className="text-2xl font-black text-[#191919] mb-3">
            Track Your Exam Mastery
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#6B6B6B] max-w-md mb-8 leading-relaxed">
            We are crafting detailed analytics, topic retention scores, and personalized practice recommendations so you can visualize your mastery over time.
          </p>

          {/* Feature Teasers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
            <div className="p-4 rounded-2xl bg-[#FFF3D6] border-2 border-[#191919] text-center shadow-brutal-sm">
              <TrendingUp className="w-5 h-5 text-[#8A5800] mx-auto mb-1.5" />
              <p className="text-xs font-black text-[#191919]">Score Trends</p>
              <p className="text-[10px] font-bold text-[#6B6B6B] mt-0.5">Exam score progression</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FCE7F1] border-2 border-[#191919] text-center shadow-brutal-sm">
              <Sparkles className="w-5 h-5 text-[#C93678] mx-auto mb-1.5" />
              <p className="text-xs font-black text-[#191919]">Weak Areas</p>
              <p className="text-[10px] font-bold text-[#6B6B6B] mt-0.5">Automated flashcard focus</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#D1FAE5] border-2 border-[#191919] text-center shadow-brutal-sm">
              <Award className="w-5 h-5 text-[#065F46] mx-auto mb-1.5" />
              <p className="text-xs font-black text-[#191919]">Streaks & Badges</p>
              <p className="text-[10px] font-bold text-[#6B6B6B] mt-0.5">Consistent study habits</p>
            </div>
          </div>

          <Link href="/dashboard">
            <button className="btn-brutal px-7 py-3.5 rounded-2xl bg-[#E85B9C] hover:bg-[#C93678] text-white text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-brutal">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
