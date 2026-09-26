"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Mcq from "../../../mcq-component/Mcq";
import ReviewTestList from "../../components/ReviewTestList";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";

function McqContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const [data, setData] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMcq = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/actions/get-mcq${contentId ? `?contentId=${contentId}` : ""}`,
        );
        if (!response.ok) {
          throw new Error("No MCQ test found for this document.");
        }
        const result = await response.json();
        if (contentId) {
          setData(result);
        } else {
          setTests(Array.isArray(result) ? result : [result]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMcq();
  }, [contentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-paper-grid gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#E85B9C]" />
        <div className="text-sm font-black text-[#191919]">Loading Multiple Choice Questions...</div>
      </div>
    );
  }

  if (error && contentId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-paper-grid px-4 text-center">
        <div className="max-w-md p-8 bg-[#FFFDF9] border-3 border-[#191919] rounded-[2.5rem] shadow-brutal-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] border-2 border-[#191919] text-[#EF4444] font-black flex items-center justify-center mx-auto mb-4">
            ✕
          </div>
          <h2 className="text-xl font-black text-[#191919] mb-2">Test Not Found</h2>
          <p className="text-xs font-semibold text-[#6B6B6B] mb-6">{error}</p>
          <button
            onClick={() => router.push("/mcq")}
            className="btn-brutal px-6 py-3 rounded-2xl bg-[#E85B9C] text-white font-extrabold text-xs cursor-pointer"
          >
            Back to Saved Tests
          </button>
        </div>
      </div>
    );
  }

  if (!contentId) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-paper-grid pt-10 pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <ReviewTestList
            type="mcq"
            items={tests}
            loading={loading}
            error={error}
            title="Saved Mock Tests"
            description="Review your past MCQ practice sessions and retake them to test your retention."
            actionLabel="Start Quiz"
            onReview={(item) => router.push(`/mcq?contentId=${item.id}`)}
            onClose={() => router.push("/dashboard")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-paper-grid px-3 py-4 sm:px-6 sm:py-6 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-4xl flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push("/mcq")}
            className="btn-brutal inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F5F2EB] text-xs font-black text-[#191919] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Tests</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE7F1] border border-[#191919] text-[11px] font-black uppercase tracking-wider text-[#C93678]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Exam Session</span>
          </div>
        </div>

        <div className="w-full">
          <Mcq mcqData={data} />
        </div>
      </div>
    </div>
  );
}

export default function McqPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-paper-grid gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#E85B9C]" />
          <div className="text-sm font-black text-[#191919]">Loading MCQs...</div>
        </div>
      }
    >
      <McqContent />
    </Suspense>
  );
}
