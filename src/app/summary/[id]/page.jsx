"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { FileText, Sparkles, ArrowLeft, BookOpen, ChevronDown, Loader2 } from "lucide-react";

export default function SummaryView() {
  const { id } = useParams();
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchSummary = async () => {
      try {
        const response = await fetch(
          `/api/actions/get-summary?contentId=${id}`,
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Summary could not be loaded.");
        }

        const summaryText =
          typeof result.summary === "string"
            ? result.summary
            : result.summary?.content || result.summary?.summary || "";

        if (!summaryText) {
          throw new Error("No summary content was found for this document.");
        }

        setSummary(summaryText);
        setSourceText(result.text?.text || "");
      } catch (fetchError) {
        setError(fetchError.message || "Summary could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-paper-grid gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#E85B9C]" />
        <p className="text-sm font-black text-[#191919]">Loading your study summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-paper-grid px-4 text-center">
        <div className="max-w-md p-8 bg-[#FFFDF9] border-3 border-[#191919] rounded-[2.5rem] shadow-brutal-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] border-2 border-[#191919] text-[#EF4444] font-black flex items-center justify-center mx-auto mb-4">
            !
          </div>
          <p className="text-sm font-bold text-[#191919] mb-6">{error}</p>
          <Button
            onClick={() => router.push("/summary")}
            className="btn-brutal h-11 px-6 rounded-2xl bg-[#E85B9C] text-white font-extrabold text-xs cursor-pointer"
          >
            Back to Saved Summaries
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-paper-grid px-4 py-8 sm:px-8 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-4xl">
        {/* Top Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/summary")}
              className="btn-brutal inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F5F2EB] text-xs font-black text-[#191919] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Summaries</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] border border-[#191919] text-[11px] font-black uppercase tracking-wider text-[#065F46]">
              <FileText className="w-3.5 h-3.5" />
              <span>Study Notes</span>
            </div>
          </div>
        </div>

        {/* Summary Card Article */}
        <article className="rounded-[2.5rem] border-3 border-[#191919] bg-[#FFFDF9] p-6 sm:p-10 shadow-brutal-lg relative overflow-hidden">
          <div className="mb-6 pb-4 border-b-2 border-[#191919] flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-black text-[#191919] tracking-tight">
              High-Yield Summary
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#FFF3D6] border border-[#191919] text-[11px] font-black text-[#8A5800]">
              ✦ AI Parsed
            </span>
          </div>

          <div className="mb-8 rounded-[2rem] bg-[#D1FAE5]/60 border-2 border-[#191919] p-6 sm:p-8 shadow-brutal-sm">
            <p className="text-xs font-black uppercase tracking-wider text-[#065F46] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Revision Notes</span>
            </p>
            <p className="whitespace-pre-wrap text-sm sm:text-base leading-8 text-[#191919] font-semibold">
              {summary}
            </p>
          </div>

          {sourceText && (
            <details className="rounded-2xl border-2 border-[#191919] bg-[#F5F2EB] p-4 group">
              <summary className="cursor-pointer text-xs font-black text-[#191919] uppercase tracking-wider flex items-center justify-between select-none">
                <span>View Source Document Text</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-4 pt-3 border-t border-[#E8E4DC]">
                <p className="max-h-64 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-[#555555] font-medium pr-2">
                  {sourceText}
                </p>
              </div>
            </details>
          )}
        </article>
      </div>
    </main>
  );
}
