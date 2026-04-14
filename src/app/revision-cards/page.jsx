"use client";
import { useEffect, useState } from "react";

export default function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const response = await fetch("/api/actions/get-cards");
      if (!response.ok) {
        throw new Error(response.error || "no mcq found");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchCards();
  }, []);
  return (
    <div>
      {" "}
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          {data.map((item) => (
            <li key={item.id}>
              <div>{item.cards}</div>
              <br />
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
