"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewTestList from "../../components/ReviewTestList";

export default function Cards() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/actions/get-cards");
        if (!response.ok) {
          throw new Error("No revision cards found");
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result : [result]);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-paper-grid pt-10 pb-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <ReviewTestList
          type="cards"
          items={data}
          loading={loading}
          error={error}
          title="Saved Revision Cards"
          description="Review your active recall flashcard sets and open a topic to continue revising."
          actionLabel="Study Cards"
          onReview={(item) => router.push(`/revision-cards/${item.id}`)}
          onClose={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
}
