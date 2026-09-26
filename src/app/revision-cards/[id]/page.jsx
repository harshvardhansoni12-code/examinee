"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { WalletCards, Sparkles, ArrowLeft, ArrowRight, BookOpen, Loader2 } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-paper-grid gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#E85B9C]" />
        <p className="text-sm font-black text-[#191919]">Loading your revision flashcards...</p>
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
            onClick={() => router.push("/revision-cards")}
            className="btn-brutal h-11 px-6 rounded-2xl bg-[#E85B9C] text-white font-extrabold text-xs cursor-pointer"
          >
            Back to Saved Cards
          </Button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex] || {};
  const points = Array.isArray(currentCard.points) ? currentCard.points : [];

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-paper-grid px-4 py-8 sm:px-8 flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        {/* Top Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/revision-cards")}
              className="btn-brutal inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F5F2EB] text-xs font-black text-[#191919] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Flashcards</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3D6] border border-[#191919] text-[11px] font-black uppercase tracking-wider text-[#8A5800]">
              <WalletCards className="w-3.5 h-3.5" />
              <span>Flashcard Set</span>
            </div>
          </div>

          <span className="text-xs font-black text-[#8A5800]">
            Card {currentIndex + 1} of {cards.length}
          </span>
        </div>

        {/* Card Study Box */}
        <section className="flex flex-col rounded-[2.5rem] border-3 border-[#191919] bg-[#FFFDF9] p-6 sm:p-10 shadow-brutal-lg relative overflow-hidden">
          {/* Progress bar */}
          <div className="mb-6 pb-4 border-b-2 border-[#191919]">
            <div className="flex items-center justify-between text-xs font-black text-[#6B6B6B] mb-2">
              <span>PROGRESS</span>
              <span>{Math.round(((currentIndex + 1) / cards.length) * 100)}% COMPLETE</span>
            </div>
            <div className="w-full bg-[#F5F2EB] border-2 border-[#191919] rounded-full h-3 p-0.5 overflow-hidden">
              <div
                className="bg-[#F59E0B] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / cards.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Flashcard Content */}
          <div className="flex flex-col justify-center rounded-[2rem] bg-[#FFF3D6] border-2 border-[#191919] p-6 sm:p-10 shadow-brutal-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-0.5 rounded-full bg-white border border-[#191919] text-[11px] font-black uppercase tracking-wider text-[#8A5800]">
                Key Concept
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#191919] tracking-tight">
              {currentCard.title || "Revision Card"}
            </h2>

            <ul className="mt-6 space-y-4">
              {points.map((point, index) => (
                <li
                  key={`${point}-${index}`}
                  className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[#191919] font-bold bg-white/70 p-3.5 rounded-2xl border border-[#191919]/20"
                >
                  <span className="w-6 h-6 rounded-full bg-[#E85B9C] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-brutal-sm">
                    {index + 1}
                  </span>
                  <span className="flex-1 min-w-0">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation controls */}
          <div className="mt-8 flex items-center justify-between pt-5 border-t-2 border-[#191919]">
            <Button
              onClick={() => setCurrentIndex((index) => index - 1)}
              disabled={currentIndex === 0}
              variant="outline"
              className="btn-brutal h-11 px-5 rounded-2xl bg-[#FFFDF9] text-[#191919] font-black text-xs cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <span className="text-xs font-black text-[#191919]">
              {currentIndex + 1} / {cards.length}
            </span>

            <Button
              onClick={() => setCurrentIndex((index) => index + 1)}
              disabled={currentIndex === cards.length - 1}
              className="btn-brutal h-11 px-6 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-black text-xs cursor-pointer flex items-center gap-2"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
