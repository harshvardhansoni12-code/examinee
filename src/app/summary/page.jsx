"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewTestList from "../../components/ReviewTestList";

export default function Summary() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setData(Array.isArray(result) ? result : [result]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-paper-grid pt-10 pb-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <ReviewTestList
          type="summary"
          items={data}
          loading={loading}
          error={error}
          title="Saved Summaries"
          description="Review your past study summaries and open any topic to read high-yield notes."
          actionLabel="Read Summary"
          onReview={(item) => router.push(`/summary/${item.id}`)}
          onClose={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
}
