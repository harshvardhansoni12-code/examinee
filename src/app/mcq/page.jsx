"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Mcq from "../../../mcq-component/Mcq";
import ReviewTestList from "../../components/ReviewTestList";

export default function McqPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const [data, setData] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
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
          throw new Error("No MCQ found");
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">Loading MCQs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!contentId) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <ReviewTestList
            type="mcq"
            items={tests}
            loading={loading}
            error={error}
            title="Saved Mock Tests"
            description="Review your past MCQ topics and continue where you left off."
            actionLabel="Review Test"
            onReview={(item) => router.push(`/mcq?contentId=${item.id}`)}
            onClose={() => router.push("/dashboard")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-8 tracking-tight">
          Multiple Choice Questions
        </h1>
        <Mcq mcqData={data} />
      </div>
    </div>
  );
}
