"use client";
import { Sparkles, ArrowRight, BookOpenCheck, BrainCircuit, CheckCircle2, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-16 lg:pt-24 lg:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
      {/* Left Content */}
      <div className="flex-1 max-w-2xl text-center lg:text-left z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3D6] border-2 border-[#191919] text-[#8A5800] text-xs md:text-sm font-extrabold shadow-brutal-sm mb-6 animate-playful-float">
          <Sparkles className="w-4 h-4 fill-[#8A5800]" />
          <span>SMARTER WAY TO PREPARE</span>
        </div>

        {/* Hero Title with playful pink highlight */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black text-[#191919] tracking-tight leading-[1.08] mb-6">
          Turn Every Quiz Into{" "}
          <span className="relative inline-block mt-2 sm:mt-0">
            <span className="relative z-10 bg-[#E85B9C] text-white px-4 py-1 rounded-2xl border-2 border-[#191919] shadow-brutal inline-block transform -rotate-2">
              A Better Score.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#555555] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
          Upload any lecture note or PDF to instantly generate realistic mock exams,
          smart revision flashcards, and high-yield topic summaries powered by AI.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
          <button
            onClick={() => router.push("/authpage")}
            className="btn-brutal flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#E85B9C] text-white font-extrabold text-base tracking-wide w-full sm:w-auto shadow-brutal hover:shadow-brutal-lg transition-all cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#features"
            className="btn-brutal flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#FFFDF9] text-[#191919] font-bold text-base hover:bg-[#F5F2EB] w-full sm:w-auto transition-all cursor-pointer"
          >
            <span>Explore Features</span>
          </a>
        </div>

        {/* Value Chips */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FCE7F1] border border-[#191919] text-[#C93678] text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Instant PDF Parsing</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D1FAE5] border border-[#191919] text-[#065F46] text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Recall MCQs</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF3D6] border border-[#191919] text-[#8A5800] text-xs font-bold">
            <Star className="w-3.5 h-3.5" />
            <span>Smart Flashcards</span>
          </div>
        </div>
      </div>

      {/* Right Content - Playful Editorial Hero Grid */}
      <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10 flex justify-center lg:justify-end">
        {/* Main Illustration Container */}
        <div className="relative w-full max-w-[480px] bg-[#FFFDF9] p-6 rounded-[2.5rem] border-3 border-[#191919] shadow-brutal-lg">
          {/* Subtle top decoration badge */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#191919] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border border-[#191919]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border border-[#191919]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-[#191919]"></span>
            </div>
            <span className="px-3 py-0.5 rounded-full bg-[#FCE7F1] border border-[#191919] text-[#C93678] text-[11px] font-extrabold tracking-wider">
              STUDY STUDIO v2.0
            </span>
          </div>

          {/* Collage Grid */}
          <div className="grid grid-cols-3 gap-3 w-full aspect-[4/3.4]">
            {/* Cell 1: Student photo */}
            <div className="col-start-2 rounded-2xl overflow-hidden border-2 border-[#191919] shadow-brutal-sm relative bg-[#FFF3D6]">
              <Image
                src="/student1.png"
                alt="Student studying"
                fill
                className="object-cover"
              />
            </div>

            {/* Cell 2: Playful Pink block */}
            <div className="col-start-3 rounded-2xl bg-[#E85B9C] border-2 border-[#191919] shadow-brutal-sm flex flex-col items-center justify-center p-3 text-white text-center">
              <BrainCircuit className="w-7 h-7 mb-1" />
              <span className="text-xs font-black uppercase">AI Exam</span>
            </div>

            {/* Cell 3: Amber block */}
            <div className="col-start-1 rounded-2xl bg-[#FFF3D6] border-2 border-[#191919] shadow-brutal-sm p-3 flex flex-col items-center justify-center text-center">
              <BookOpenCheck className="w-7 h-7 text-[#8A5800] mb-1" />
              <span className="text-xs font-extrabold text-[#8A5800]">MCQ Gen</span>
            </div>

            {/* Cell 4: Student center */}
            <div className="col-start-2 rounded-2xl overflow-hidden border-2 border-[#191919] shadow-brutal-sm relative bg-[#FCE7F1]">
              <Image
                src="/student2.png"
                alt="Student with notes"
                fill
                className="object-cover"
              />
            </div>

            {/* Cell 5: Mint block */}
            <div className="col-start-3 rounded-2xl bg-[#D1FAE5] border-2 border-[#191919] shadow-brutal-sm p-3 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-[#065F46]">98%</span>
              <span className="text-[10px] font-extrabold text-[#065F46] uppercase">Accuracy</span>
            </div>

            {/* Cell 6: Student 3 */}
            <div className="col-start-1 rounded-2xl overflow-hidden border-2 border-[#191919] shadow-brutal-sm relative bg-[#FFF3D6]">
              <Image
                src="/student3.png"
                alt="Taking notes"
                fill
                className="object-cover"
              />
            </div>

            {/* Cell 7: Dark pill block */}
            <div className="col-start-2 rounded-2xl bg-[#191919] border-2 border-[#191919] shadow-brutal-sm p-3 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-6 h-6 text-[#E85B9C] mb-1" />
              <span className="text-[10px] font-black text-white uppercase">Active Recall</span>
            </div>

            {/* Cell 8: Student 4 */}
            <div className="col-start-3 rounded-2xl overflow-hidden border-2 border-[#191919] shadow-brutal-sm relative bg-[#FCE7F1]">
              <Image
                src="/student4.png"
                alt="Cheerful student"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating Badge 1 - Top Left */}
          <div className="absolute -top-5 -left-5 bg-[#FFFDF9] border-2 border-[#191919] rounded-2xl px-3.5 py-2 shadow-brutal flex items-center gap-2 transform -rotate-3 animate-playful-float">
            <span className="w-7 h-7 rounded-xl bg-[#E85B9C] flex items-center justify-center text-white font-bold text-xs">
              ✦
            </span>
            <div>
              <p className="text-[11px] font-black text-[#191919]">Mock Test Ready</p>
              <p className="text-[9px] font-bold text-[#6B6B6B]">20 AI Questions</p>
            </div>
          </div>

          {/* Floating Badge 2 - Bottom Right */}
          <div className="absolute -bottom-5 -right-4 bg-[#FFFDF9] border-2 border-[#191919] rounded-2xl px-3.5 py-2 shadow-brutal flex items-center gap-2 transform rotate-2">
            <span className="w-7 h-7 rounded-xl bg-[#10B981] flex items-center justify-center text-white font-bold text-xs">
              ✓
            </span>
            <div>
              <p className="text-[11px] font-black text-[#191919]">Score Improved</p>
              <p className="text-[9px] font-bold text-[#065F46] font-mono">+24% Average</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
