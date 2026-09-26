"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpenCheck, WalletCards, FileText, ArrowRight, Sparkles } from "lucide-react";

export default function LandingOptions({ disabled = false, onNavigate }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const optionsDisabled = disabled || isNavigating;

  const navigate = (path) => {
    if (optionsDisabled) return;
    setIsNavigating(true);
    onNavigate?.();
    router.push(path);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Mock Tests */}
        <button
          onClick={() => navigate("/mcq")}
          disabled={optionsDisabled}
          className="group card-brutal flex flex-col items-start p-7 bg-[#FFFDF9] rounded-[2.5rem] text-left cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        >
          <div className="w-14 h-14 bg-[#FCE7F1] border-2 border-[#191919] rounded-2xl flex items-center justify-center mb-6 shadow-brutal-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-200">
            <BookOpenCheck className="w-7 h-7 text-[#C93678]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C93678] mb-1">
            Exam Archive
          </span>
          <h3 className="text-xl font-black text-[#191919] mb-2">Mock Tests</h3>
          <p className="text-xs font-semibold text-[#6B6B6B] leading-relaxed mb-6">
            Review your past generated tests and retake them with one click.
          </p>
          <span className="btn-brutal text-xs font-extrabold px-4 py-2 rounded-xl bg-[#FCE7F1] text-[#C93678] flex items-center gap-2 group-hover:bg-[#E85B9C] group-hover:text-white transition-all mt-auto">
            <span>Review Tests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Card 2: Flashcards */}
        <button
          onClick={() => navigate("/revision-cards")}
          disabled={optionsDisabled}
          className="group card-brutal flex flex-col items-start p-7 bg-[#FFFDF9] rounded-[2.5rem] text-left cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        >
          <div className="w-14 h-14 bg-[#FFF3D6] border-2 border-[#191919] rounded-2xl flex items-center justify-center mb-6 shadow-brutal-sm group-hover:scale-110 group-hover:-rotate-6 transition-all duration-200">
            <WalletCards className="w-7 h-7 text-[#8A5800]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8A5800] mb-1">
            Active Recall
          </span>
          <h3 className="text-xl font-black text-[#191919] mb-2">Flashcards</h3>
          <p className="text-xs font-semibold text-[#6B6B6B] leading-relaxed mb-6">
            Open previous flashcard sets and continue active revision anytime.
          </p>
          <span className="btn-brutal text-xs font-extrabold px-4 py-2 rounded-xl bg-[#FFF3D6] text-[#8A5800] flex items-center gap-2 group-hover:bg-[#F59E0B] group-hover:text-white transition-all mt-auto">
            <span>Review Cards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Card 3: Summary */}
        <button
          onClick={() => navigate("/summary")}
          disabled={optionsDisabled}
          className="group card-brutal flex flex-col items-start p-7 bg-[#FFFDF9] rounded-[2.5rem] text-left cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        >
          <div className="w-14 h-14 bg-[#D1FAE5] border-2 border-[#191919] rounded-2xl flex items-center justify-center mb-6 shadow-brutal-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-200">
            <FileText className="w-7 h-7 text-[#065F46]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#065F46] mb-1">
            Revision Notes
          </span>
          <h3 className="text-xl font-black text-[#191919] mb-2">Summaries</h3>
          <p className="text-xs font-semibold text-[#6B6B6B] leading-relaxed mb-6">
            Load earlier summaries and refresh your key revision notes instantly.
          </p>
          <span className="btn-brutal text-xs font-extrabold px-4 py-2 rounded-xl bg-[#D1FAE5] text-[#065F46] flex items-center gap-2 group-hover:bg-[#10B981] group-hover:text-white transition-all mt-auto">
            <span>View Summaries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
