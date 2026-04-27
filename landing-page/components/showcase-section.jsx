import { ArrowRight, BarChart3, BrainCircuit, FileSearch } from "lucide-react";

export const ShowcaseSection = () => {
  return (
    <div className="w-full bg-indigo-600 py-20 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Everything You Need to Excel
        </h2>
        <p className="text-indigo-100 max-w-2xl mx-auto mb-12">
          We provide all the AI-powered tools you need to build your knowledge,
          test your memory, and track your progress throughout your academic
          journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[2rem] p-8 text-left shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <FileSearch className="size-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Upload & Parse
            </h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Simply upload your PDF study materials and our AI will parse the
              content, extracting key concepts and definitions automatically.
            </p>
            <button className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              See Details <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[2rem] p-8 text-left shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 rounded-full blur-2xl z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="size-7 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Generate Tests
              </h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Create infinite combinations of Multiple Choice Questions and
                interactive Flashcards from your materials to test your active
                recall.
              </p>
              <button className="text-rose-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                See Details <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[2rem] p-8 text-left shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="size-7 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Track Progress
            </h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Visualize your learning journey with detailed analytics. See which
              topics you've mastered and where you need more focus.
            </p>
            <button className="text-amber-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              See Details <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
