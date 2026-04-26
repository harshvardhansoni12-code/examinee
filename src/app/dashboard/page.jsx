"use client";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import { InputBar } from "../../../landing-page/components/inputbar.jsx";
import LandingOptions from "../../../landing-page/components/landing-options";
import { OptionsButtons } from "../../../landing-page/components/option-buttons";
import { useState } from "react";
export default function Dashboard() {
  const [pdf, setPdf] = useState();
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white dark:from-indigo-950 dark:via-background dark:to-background">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center space-y-4 mb-16 mt-8">
        <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100/50 px-4 py-1.5 text-sm font-medium text-indigo-800 mb-2 shadow-sm backdrop-blur-sm dark:border-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
           Your Personal Study Assistant
        </div>
        <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 drop-shadow-sm">
          <TypewriterEffect />
        </div>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your study materials and let our AI generate mock tests, smart flashcards, and comprehensive summaries in seconds.
        </p>
      </div>

      {/* Main Workspace Card */}
      <div className="w-full max-w-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="flex flex-col items-center space-y-10 relative z-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Start Processing</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 mt-2">Upload a PDF document to generate your study materials</p>
          </div>
          
          <div className="w-full flex justify-center">
            <InputBar pdf={pdf} setPdf={setPdf} />
          </div>
          
          <div className="w-full flex justify-center pt-2">
            <OptionsButtons pdf={pdf} />
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="w-full max-w-5xl mt-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Quick Access</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-1">Jump right back into your study sessions</p>
        </div>
        <LandingOptions />
      </div>
    </div>
  );
};
