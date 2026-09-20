"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

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
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-6">
        <p className="text-slate-500">Loading your summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.push("/summary")} variant="outline">
          Back to Saved Summaries
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
              Study Summary
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Saved Summary
            </h1>
          </div>
          <Button
            onClick={() => router.push("/summary")}
            variant="outline"
            className="shrink-0"
          >
            Saved Summaries
          </Button>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
          <div className="mb-6 rounded-2xl bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-700">
              Key revision notes
            </p>
            <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">
              {summary}
            </p>
          </div>

          {sourceText && (
            <details className="rounded-2xl border border-slate-200 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                View source document text
              </summary>
              <p className="mt-4 max-h-64 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-500">
                {sourceText}
              </p>
            </details>
          )}
        </article>
      </div>
    </main>
  );
}
