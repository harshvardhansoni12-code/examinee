"use client";

export default function Performance() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Performance Analytics
        </h1>
        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-12"></div>
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Coming Soon</h2>
          <p className="text-slate-500 max-w-md">
            We are working on detailed analytics and performance tracking. Soon you'll be able to visualize your progress over time!
          </p>
        </div>
      </div>
    </div>
  );
}
