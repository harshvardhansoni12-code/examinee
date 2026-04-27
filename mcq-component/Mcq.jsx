"use client";

import { useState } from "react";
import { Button } from "../src/components/ui/button";

export default function Mcq({ mcqData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track which questions are answered correctly

  // Parse MCQ data - handle JSON string from database or object from API
  const parseMcqData = (data) => {
    let questions = [];

    // Helper function to clean and parse JSON string
    const cleanAndParseJson = (jsonString) => {
      if (typeof jsonString !== "string") return null;

      // Remove markdown code blocks (```json or ```)
      let cleaned = jsonString
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      // Remove any trailing backticks or whitespace
      cleaned = cleaned.replace(/`+$/, "").trim();

      try {
        return JSON.parse(cleaned);
      } catch (e) {
        console.log("Failed to parse cleaned JSON:", cleaned.substring(0, 100));
        return null;
      }
    };

    // If data is an array of mcq objects from database
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (typeof item.mcq === "string") {
          const parsed = cleanAndParseJson(item.mcq);
          if (parsed && parsed.questions && Array.isArray(parsed.questions)) {
            questions = [...questions, ...parsed.questions];
          }
        } else if (item.mcq && item.mcq.questions) {
          questions = [...questions, ...item.mcq.questions];
        }
      });
    }
    // If data is already parsed object from API
    else if (data && data.questions && Array.isArray(data.questions)) {
      questions = data.questions;
    }
    // If data has a data property (from API response)
    else if (data && data.data && data.data.questions) {
      questions = data.data.questions;
    }

    return questions;
  };

  const questions = parseMcqData(mcqData);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">
          No valid MCQs found. Please check your data.
        </p>
      </div>
    );
  }

  const currentMcq = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  // Handler functions defined first
  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    if (!isSubmitted) {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    setIsSubmitted(true);

    const selectedOptionText = currentMcq.options[selectedOption];
    const isCorrect = selectedOptionText === currentMcq.correctAnswer;

    if (isCorrect && !answeredQuestions[currentIndex]) {
      setScore(score + 1);
      setAnsweredQuestions({ ...answeredQuestions, [currentIndex]: true });
    }

    // If it's the last question, show result after a short delay
    if (isLast) {
      setTimeout(() => {
        setShowResult(true);
      }, 1500);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions({});
  };

  const getOptionClassName = (optionIndex) => {
    const baseClasses =
      "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";

    if (!isSubmitted) {
      // Before submit - show selected state
      return (
        baseClasses +
        (selectedOption === optionIndex
          ? "border-indigo-500 bg-indigo-50"
          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50")
      );
    }

    // After submit - show correct/incorrect
    const isSelected = selectedOption === optionIndex;
    const isCorrect =
      currentMcq.options[optionIndex] === currentMcq.correctAnswer;

    if (isCorrect) {
      return baseClasses + "border-green-500 bg-green-50"; // Correct answer - green
    }

    if (isSelected && !isCorrect) {
      return baseClasses + "border-red-500 bg-red-50"; // Selected wrong answer - red
    }

    return baseClasses + "border-slate-200 opacity-50"; // Other options
  };

  // Show result window if quiz is completed
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let emoji = "";

    if (percentage >= 80) {
      message = "Excellent work!";
      emoji = "🎉";
    } else if (percentage >= 60) {
      message = "Good job!";
      emoji = "👍";
    } else if (percentage >= 40) {
      message = "Keep practicing!";
      emoji = "📚";
    } else {
      message = "Don't give up!";
      emoji = "💪";
    }

    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
          Quiz Completed!
        </h2>
        <p className="text-slate-500 mb-8">{message}</p>

        <div className="bg-indigo-600 rounded-[2rem] p-8 mb-8 shadow-xl">
          <p className="text-white/90 text-lg mb-2">Your Final Score</p>
          <p className="text-white text-5xl font-bold">
            {score} / {questions.length}
          </p>
          <p className="text-white/80 text-lg mt-2">{percentage}%</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="px-6 py-3"
          >
            Try Again
          </Button>
          <a href="/dashboard">
            <Button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-bold">
              Back to Dashboard
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full max-h-[85vh] flex flex-col mx-auto p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100">
      {/* Progress Indicator */}
      <div className="mb-6 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
            complete
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 min-h-0 mb-4">
        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {currentMcq.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentMcq.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={getOptionClassName(index)}
              disabled={isSubmitted}
            >
              <span className="font-medium text-gray-700 mr-3">
                {String.fromCharCode(97 + index)})
              </span>
              <span className="text-gray-600 text-left block">{option}</span>
            </button>
          ))}
        </div>

        {/* Score Display */}
        <div className="mb-4 p-4 bg-indigo-50 rounded-xl">
          <p className="text-indigo-800 font-bold text-center">
            Score: {score} / {questions.length} correct
          </p>
        </div>

        {/* Answer Feedback */}
        {isSubmitted && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              currentMcq.options[selectedOption] === currentMcq.correctAnswer
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p
              className={`font-medium ${
                currentMcq.options[selectedOption] === currentMcq.correctAnswer
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {currentMcq.options[selectedOption] === currentMcq.correctAnswer
                ? "Correct!"
                : "Incorrect!"}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-2">
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitted}
            variant="outline"
            className={`flex-1 ${isSubmitted ? "opacity-50" : ""}`}
          >
            {isSubmitted ? "Submitted" : "Submit Answer"}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 shrink-0">
        <Button
          onClick={handlePrevious}
          disabled={isFirst}
          variant="outline"
          className={`px-6 ${isFirst ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          ← Previous
        </Button>

        <span className="text-gray-500">
          {currentIndex + 1} / {questions.length}
        </span>

        <Button
          onClick={handleNext}
          disabled={isLast}
          variant="outline"
          className={`px-6 ${isLast ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
