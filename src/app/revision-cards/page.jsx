"use client";
import { useEffect, useState } from "react";

export default function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Array of different card top border accent colors
  const cardColors = [
    "border-t-indigo-500",
    "border-t-rose-500",
    "border-t-purple-500",
    "border-t-amber-400",
    "border-t-emerald-500",
    "border-t-blue-500",
  ];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/actions/get-cards");
        if (!response.ok) {
          throw new Error("no cards found");
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching cards:", e);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-8 tracking-tight">
        Revision Cards
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading cards...</div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {data.map((item, itemIndex) => {
            let cardsArray = [];

            if (Array.isArray(item.cards)) {
              cardsArray = item.cards;
            } else if (typeof item.cards === "string") {
              try {
                const cleaned = item.cards
                  .replace(/```json/g, "")
                  .replace(/```/g, "")
                  .trim();

                cardsArray = JSON.parse(cleaned);
              } catch (e) {
                console.error("Parse failed:", item.cards);
              }
            }

            return cardsArray.map((card, cardIndex) => {
              // Get color based on index, cycling through the array
              const colorIndex = (itemIndex + cardIndex) % cardColors.length;
              const colorClass = cardColors[colorIndex];

              return (
                <div key={`${itemIndex}-${cardIndex}`} className="">
                  <div
                    className={`h-[26rem] w-80 bg-white border-x border-b border-slate-100 border-t-8 ${colorClass} p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                  >
                    <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                      {card.title}
                    </h2>

                    <ul className="space-y-3 overflow-y-auto h-72 pr-2 custom-scrollbar">
                      {card.points?.map((p, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="text-slate-600 text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-slate-300 mt-0.5">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            });
          })}
        </div>
      )}
    </div>
  );
}
