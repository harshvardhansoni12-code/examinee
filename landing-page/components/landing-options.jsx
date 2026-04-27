"use client";
import { BookOpenCheck, WalletCards, ChartNoAxesCombined, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingOptions() {
  const router = useRouter();

  const McqClick = () => {
    router.push("/dashboard");
    router.refresh();
  };
  
  const RevisionCard = () => {
    router.push("/revision-cards");
    router.refresh();
  };

  const PerformanceClick = () => {
    router.push("/performance");
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 w-full">
      <button 
        onClick={McqClick}
        className="group flex flex-col items-start p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
      >
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <BookOpenCheck className="size-7 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Mock Tests</h3>
        <p className="text-sm text-slate-500 mb-6">Generate & take AI MCQs from your study materials.</p>
        <span className="text-indigo-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
          Start Test <ArrowRight className="size-4" />
        </span>
      </button>

      <button 
        onClick={RevisionCard}
        className="group flex flex-col items-start p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
      >
        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <WalletCards className="size-7 text-rose-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Flashcards</h3>
        <p className="text-sm text-slate-500 mb-6">Quick revision smart cards for active recall.</p>
        <span className="text-rose-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
          Review Cards <ArrowRight className="size-4" />
        </span>
      </button>

      <button 
        onClick={PerformanceClick}
        className="group flex flex-col items-start p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
      >
        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <ChartNoAxesCombined className="size-7 text-amber-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Analytics</h3>
        <p className="text-sm text-slate-500 mb-6">Track your progress and mastery over time.</p>
        <span className="text-amber-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
          View Stats <ArrowRight className="size-4" />
        </span>
      </button>
    </div>
  );
}
