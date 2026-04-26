"use client";
import { BookOpenCheck } from "lucide-react";
import { WalletCards } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
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
        className="group relative flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <BookOpenCheck className="size-16 text-indigo-500 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Mock Tests</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">Generate & take AI MCQs</p>
      </button>

      <button 
        onClick={RevisionCard}
        className="group relative flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <WalletCards className="size-16 text-purple-500 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Flashcards</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">Quick revision smart cards</p>
      </button>

      <button 
        onClick={PerformanceClick}
        className="group relative flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <ChartNoAxesCombined className="size-16 text-blue-500 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Analytics</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">Track your progress</p>
      </button>
    </div>
  );
}
