import { FileCheck2, Lightbulb, WalletCards, ArrowUpRight } from "lucide-react";

export const FeatureStrips = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Smart MCQs */}
        <div className="card-brutal flex items-center justify-between p-6 rounded-[2rem] bg-[#FCE7F1] text-[#191919] group cursor-default">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border-2 border-[#191919] shadow-brutal-sm flex items-center justify-center group-hover:rotate-6 transition-transform">
              <FileCheck2 className="w-7 h-7 text-[#C93678]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C93678]">Exam Mode</span>
              <h3 className="text-xl font-black text-[#191919]">Smart MCQs</h3>
              <p className="text-xs font-semibold text-[#555555] mt-0.5">
                Generate tailored mock tests
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white border-2 border-[#191919] flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
            <ArrowUpRight className="w-4 h-4 text-[#191919]" />
          </div>
        </div>

        {/* Card 2: AI Flashcards */}
        <div className="card-brutal flex items-center justify-between p-6 rounded-[2rem] bg-[#FFF3D6] text-[#191919] group cursor-default">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border-2 border-[#191919] shadow-brutal-sm flex items-center justify-center group-hover:-rotate-6 transition-transform">
              <WalletCards className="w-7 h-7 text-[#8A5800]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8A5800]">Study Mode</span>
              <h3 className="text-xl font-black text-[#191919]">AI Flashcards</h3>
              <p className="text-xs font-semibold text-[#555555] mt-0.5">
                Active recall simplified
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white border-2 border-[#191919] flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
            <ArrowUpRight className="w-4 h-4 text-[#191919]" />
          </div>
        </div>

        {/* Card 3: Instant Summaries */}
        <div className="card-brutal flex items-center justify-between p-6 rounded-[2rem] bg-[#D1FAE5] text-[#191919] group cursor-default">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border-2 border-[#191919] shadow-brutal-sm flex items-center justify-center group-hover:rotate-6 transition-transform">
              <Lightbulb className="w-7 h-7 text-[#065F46]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#065F46]">Review Mode</span>
              <h3 className="text-xl font-black text-[#191919]">Instant Summary</h3>
              <p className="text-xs font-semibold text-[#555555] mt-0.5">
                Grasp core concepts fast
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white border-2 border-[#191919] flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
            <ArrowUpRight className="w-4 h-4 text-[#191919]" />
          </div>
        </div>
      </div>
    </section>
  );
};
