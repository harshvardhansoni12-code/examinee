import { ArrowRight, BarChart3, BrainCircuit, FileSearch, Sparkles } from "lucide-react";
import Link from "next/link";

export const ShowcaseSection = () => {
  return (
    <section id="features" className="w-full bg-[#191919] text-white py-24 mt-16 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFDF9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85B9C] border-2 border-white text-white text-xs font-black tracking-wider uppercase mb-6 shadow-brutal-sm">
          <Sparkles className="w-4 h-4 fill-white" />
          <span>ALL-IN-ONE STUDY WORKFLOW</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Everything You Need to Excel
        </h2>
        <p className="text-[#C0C0C0] max-w-2xl mx-auto mb-16 text-base md:text-lg leading-relaxed">
          Transform static notes and PDFs into dynamic, personalized practice tests,
          flashcards, and review notes in seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#FFFDF9] text-[#191919] rounded-[2.5rem] p-8 text-left border-3 border-[#191919] shadow-[6px_6px_0px_#E85B9C] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-[#FCE7F1] border-2 border-[#191919] rounded-2xl flex items-center justify-center shadow-brutal-sm">
                  <FileSearch className="w-7 h-7 text-[#C93678]" />
                </div>
                <span className="text-xs font-black px-3 py-1 bg-[#F5F2EB] border border-[#191919] rounded-full text-[#6B6B6B]">
                  STEP 01
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#191919] mb-3">
                Upload & Parse
              </h3>
              <p className="text-[#555555] mb-6 text-sm leading-relaxed font-medium">
                Upload your lecture notes, textbook chapters, or exam study guides.
                Our AI rapidly extracts critical definitions, formulas, and concepts.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E8E4DC]">
              <span className="text-[#C93678] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                ✦ High accuracy OCR & parsing
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFDF9] text-[#191919] rounded-[2.5rem] p-8 text-left border-3 border-[#191919] shadow-[6px_6px_0px_#FFF3D6] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-[#FFF3D6] border-2 border-[#191919] rounded-2xl flex items-center justify-center shadow-brutal-sm">
                  <BrainCircuit className="w-7 h-7 text-[#8A5800]" />
                </div>
                <span className="text-xs font-black px-3 py-1 bg-[#F5F2EB] border border-[#191919] rounded-full text-[#6B6B6B]">
                  STEP 02
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#191919] mb-3">
                Generate Tests
              </h3>
              <p className="text-[#555555] mb-6 text-sm leading-relaxed font-medium">
                Create interactive Multiple Choice Questions with answer keys and
                concise Flashcard decks to reinforce memory with active recall.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E8E4DC]">
              <span className="text-[#8A5800] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                ✦ Instant question generation
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFDF9] text-[#191919] rounded-[2.5rem] p-8 text-left border-3 border-[#191919] shadow-[6px_6px_0px_#D1FAE5] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-[#D1FAE5] border-2 border-[#191919] rounded-2xl flex items-center justify-center shadow-brutal-sm">
                  <BarChart3 className="w-7 h-7 text-[#065F46]" />
                </div>
                <span className="text-xs font-black px-3 py-1 bg-[#F5F2EB] border border-[#191919] rounded-full text-[#6B6B6B]">
                  STEP 03
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#191919] mb-3">
                Review & Master
              </h3>
              <p className="text-[#555555] mb-6 text-sm leading-relaxed font-medium">
                Retake past mock exams, review detailed flashcard summaries, and revisit
                stored materials anytime to master your coursework.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E8E4DC]">
              <span className="text-[#065F46] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                ✦ Continuous retention loop
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
