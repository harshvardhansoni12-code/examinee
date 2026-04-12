"use client";
import { useEffect, useState } from "react";

export default function Mcq() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMcq = async () => {
      setLoading(true);
      const response = await fetch("/api/actions/get-mcq");
      //  const data = await response.json();
      if (!response.ok) {
        throw new Error(response.error || "no mcq found");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchMcq();
  }, []);
  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          {data.map((item) => (
            <li key={item.id}>
              <div>{item.mcq}</div>
              <br />
            </li>
          ))}
        </div>
      )}
    </>
  );
}
