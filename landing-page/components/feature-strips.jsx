import { FileCheck2, Lightbulb, Presentation } from "lucide-react";

export const FeatureStrips = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <FileCheck2 className="size-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Smart MCQs</h3>
            <p className="text-sm text-slate-500 mt-1">
              Generate tailored mock tests
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center">
            <Presentation className="size-8 text-rose-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">AI Flashcards</h3>
            <p className="text-sm text-slate-500 mt-1">
              Active recall simplified
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center">
            <Lightbulb className="size-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Instant Summaries
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Grasp core concepts fast
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
