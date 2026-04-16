"use client";
import { useEffect, useState } from "react";

export default function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
        console.error("Invalid JSON:", item.cards);
      }
    };
    fetchCards();
  }, []);
  //
  return (
    <div>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {data.map((item) => {
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

            return cardsArray.map((card, i) => (
              <div
                key={i}
                className="flex flex-1 items-center justify-center min-h-screen"
              >
                <div className="h-90 w-60 bg-gray-200 items-center p-2 rounded-2xl">
                  <h2>{card.title}</h2>

                  <ul className="p-2">
                    {card.points?.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ));
          })}
        </>
      )}
    </div>
  );
}
