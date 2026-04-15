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
          {data.map((card, index) => (
            <div key={index}>
              <h2>{card.title}</h2>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
