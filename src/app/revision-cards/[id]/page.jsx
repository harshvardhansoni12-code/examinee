"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

const parseCards = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  try {
    const cleaned = value
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function RevisionCardsView() {
  const { id } = useParams();
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCards = async () => {
      try {
        const response = await fetch(`/api/actions/get-cards?contentId=${id}`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Cards could not be loaded.");
        }

        const parsedCards = parseCards(result.cards);
        if (parsedCards.length === 0) {
          throw new Error("No revision cards were found for this document.");
        }
        setCards(parsedCards);
      } catch (fetchError) {
        setError(fetchError.message || "Cards could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-6">
        <p className="text-slate-500">Loading your revision cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <p className="text-red-600">{error}</p>
        <Button
          onClick={() => router.push("/revision-cards")}
          variant="outline"
        >
          Back to Saved Cards
        </Button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const points = Array.isArray(currentCard.points) ? currentCard.points : [];

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
              Revision Cards
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {currentCard.title || "Study Card"}
            </h1>
          </div>
          <Button
            onClick={() => router.push("/revision-cards")}
            variant="outline"
            className="shrink-0"
          >
            Saved Cards
          </Button>
        </div>

        <section className="flex flex-1 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between text-sm text-slate-500">
            <span>
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span>
              {Math.round(((currentIndex + 1) / cards.length) * 100)}% complete
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center rounded-2xl bg-rose-50/70 p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {currentCard.title || "Revision Card"}
            </h2>
            <ul className="mt-6 space-y-4">
              {points.map((point, index) => (
                <li
                  key={`${point}-${index}`}
                  className="flex gap-3 text-base leading-relaxed text-slate-700 sm:text-lg"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
            <Button
              onClick={() => setCurrentIndex((index) => index - 1)}
              disabled={currentIndex === 0}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-slate-500">
              {currentIndex + 1} / {cards.length}
            </span>
            <Button
              onClick={() => setCurrentIndex((index) => index + 1)}
              disabled={currentIndex === cards.length - 1}
              className="bg-rose-500 text-white hover:bg-rose-600"
            >
              Next
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
