"use client";
import { useEffect, useState } from "react";

export default function Summary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Array of accent colors for left border only
  const accentColors = [
    "border-l-indigo-500",
    "border-l-rose-500",
    "border-l-purple-500",
    "border-l-amber-400",
    "border-l-emerald-500",
    "border-l-blue-500",
    "border-l-slate-500",
  ];

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/actions/get-summary");
        if (!response.ok) {
          throw new Error("No summary found");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // Helper function to parse summary data
  const parseSummary = (summaryData) => {
    if (typeof summaryData === "string") {
      try {
        // Remove markdown code blocks if present
        const cleaned = summaryData
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        return JSON.parse(cleaned);
      } catch (e) {
        // If not JSON, return as plain text
        return { content: summaryData };
      }
    }
    return summaryData;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-xl text-gray-600 font-medium">Loading summaries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-xl text-red-600 font-medium">Error: {error}</div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Study Summaries
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-4 text-lg">
            Quick revision notes from your uploaded content
          </p>
        </div>

        {data.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-20 bg-gray-50 rounded-2xl">
            No summaries available yet. Upload a PDF to generate summaries!
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => {
              const parsedSummary = parseSummary(item.summary);
              const accentClass = accentColors[index % accentColors.length];
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-white border border-slate-100 ${accentClass} border-l-8 rounded-[1.5rem] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mb-6`}
                >
                  {/* Header / Toggle */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {parsedSummary.title || `Summary #${index + 1}`}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={`px-6 pb-6 transition-all duration-300 ${
                      isExpanded ? "block" : "hidden"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-100">
                      {parsedSummary.content || parsedSummary.summary ? (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {parsedSummary.content || parsedSummary.summary}
                        </p>
                      ) : (
                        <ul className="space-y-3">
                          {parsedSummary.points?.map((point, i) => (
                            <li
                              key={i}
                              className="text-slate-600 leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-slate-300 mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Preview when collapsed */}
                  {!isExpanded && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {parsedSummary.content || parsedSummary.summary
                          ? (parsedSummary.content || parsedSummary.summary).substring(0, 120) + "..."
                          : parsedSummary.points?.slice(0, 2).join(" • ") + "..."}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
