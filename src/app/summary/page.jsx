"use client";
import { useEffect, useState } from "react";
export default function Summary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      const response = await fetch("/api/actions/get-summary");
      if (!response.ok) {
        throw new Error("no summary found");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchSummary();
  }, []);
  return (
    <div>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          {data.map((item) => (
            <li key={item.id}>
              <div>{item.summary}</div>
              <br />
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
