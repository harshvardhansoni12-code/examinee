"use client";
import { useEffect, useState } from "react";
import Mcq from "../../../mcq-component/Mcq";

export default function McqPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMcq = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/actions/get-mcq");
        if (!response.ok) {
          throw new Error("No MCQ found");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMcq();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">Loading MCQs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-8 tracking-tight">
          Multiple Choice Questions
        </h1>
        <Mcq mcqData={data} />
      </div>
    </div>
  );
}
