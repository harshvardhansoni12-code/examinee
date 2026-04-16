"use client";
import { useState } from "react";

export default function Mcq({ questions = [] }) {
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qIndex, option) => {
    setSelected((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const getScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {questions.map((q, i) => (
        <div key={i} className="mb-6 p-4 border rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            {i + 1}. {q.question}
          </h2>

          <div className="space-y-2">
            {q.options.map((opt, j) => {
              const isSelected = selected[i] === opt;
              const isCorrect = q.correctAnswer === opt;

              let style = "border p-2 rounded cursor-pointer";

              if (showResult) {
                if (isCorrect) style += " bg-green-200";
                else if (isSelected) style += " bg-red-200";
              } else if (isSelected) {
                style += " bg-blue-200";
              }

              return (
                <div
                  key={j}
                  className={style}
                  onClick={() => !showResult && handleSelect(i, opt)}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!showResult ? (
        <button
          onClick={() => setShowResult(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      ) : (
        <div className="mt-4 text-lg font-bold">
          Score: {getScore()} / {questions.length}
        </div>
      )}
    </div>
  );
}
