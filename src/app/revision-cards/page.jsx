"use client";
import { useEffect, useState } from "react";

export default function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Array of different card background colors
  const cardColors = [
    "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300",
    "bg-gradient-to-br from-green-100 to-green-200 border-green-300",
    "bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300",
    "bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300",
    "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300",
    "bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300",
    "bg-gradient-to-br from-teal-100 to-teal-200 border-teal-300",
    "bg-gradient-to-br from-red-100 to-red-200 border-red-300",
    "bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300",
    "bg-gradient-to-br from-cyan-100 to-cyan-200 border-cyan-300",
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
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
                  <div className={`h-96 w-72 ${colorClass} border-2 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-400/30">
                      {card.title}
                    </h2>

                    <ul className="space-y-2 overflow-y-auto h-64 pr-1">
                      {card.points?.map((p, pointIndex) => (
                        <li 
                          key={pointIndex} 
                          className="text-gray-700 text-sm leading-relaxed bg-white/50 p-2 rounded-lg"
                        >
                          • {p}
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
