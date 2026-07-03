"use client";
import { useRouter } from "next/navigation";
import { BookOpenCheck, WalletCards, FileText, ArrowRight } from "lucide-react";

export default function LandingOptions() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => router.push("/mcq")}
          className="group flex flex-col items-start p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <BookOpenCheck className="size-7 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Mock Tests</h3>
          <p className="text-sm text-slate-500 mb-6">
            Review your past tests and retake them with one click.
          </p>
          <span className="text-indigo-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
            Review Tests <ArrowRight className="size-4" />
          </span>
        </button>

        <button
          onClick={() => router.push("/revision-cards")}
          className="group flex flex-col items-start p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <WalletCards className="size-7 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Flashcards</h3>
          <p className="text-sm text-slate-500 mb-6">
            Open your previous flashcards and continue revising anytime.
          </p>
          <span className="text-rose-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
            Review Cards <ArrowRight className="size-4" />
          </span>
        </button>

        <button
          onClick={() => router.push("/summary")}
          className="group flex flex-col items-start p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <FileText className="size-7 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Summary</h3>
          <p className="text-sm text-slate-500 mb-6">
            Load earlier summaries and refresh your revision notes instantly.
          </p>
          <span className="text-amber-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
            View Summary <ArrowRight className="size-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
