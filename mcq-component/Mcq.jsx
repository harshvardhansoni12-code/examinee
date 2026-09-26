"use client";

import { useState } from "react";
import { Button } from "../src/components/ui/button";
import { Sparkles, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, Trophy, Check } from "lucide-react";
import Link from "next/link";

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

      let cleaned = jsonString
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      cleaned = cleaned.replace(/`+$/, "").trim();

      try {
        return JSON.parse(cleaned);
      } catch (e) {
        console.log("Failed to parse cleaned JSON:", cleaned.substring(0, 100));
        return null;
      }
    };

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
    } else if (data && data.questions && Array.isArray(data.questions)) {
      questions = data.questions;
    } else if (data && data.data && data.data.questions) {
      questions = data.data.questions;
    } else if (data && data.mcq) {
      if (typeof data.mcq === "string") {
        const parsed = cleanAndParseJson(data.mcq);
        questions = parsed?.questions || [];
      } else if (Array.isArray(data.mcq.questions)) {
        questions = data.mcq.questions;
      }
    }

    return questions;
  };

  const questions = parseMcqData(mcqData);

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#FFFDF9] border-3 border-[#191919] rounded-[2.5rem] shadow-brutal text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] border-2 border-[#191919] text-[#EF4444] font-black flex items-center justify-center mb-4">
          !
        </div>
        <h3 className="text-xl font-black text-[#191919] mb-2">No Valid Questions Found</h3>
        <p className="text-xs font-semibold text-[#6B6B6B]">
          Please check your study document and try generating the test again.
        </p>
      </div>
    );
  }

  const currentMcq = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

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
    const nextScore =
      isCorrect && !answeredQuestions[currentIndex] ? score + 1 : score;

    if (isCorrect && !answeredQuestions[currentIndex]) {
      setScore(nextScore);
      setAnsweredQuestions({ ...answeredQuestions, [currentIndex]: true });
    }

    if (isLast) {
      setTimeout(() => {
        setScore(nextScore);
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

  const getOptionClasses = (optionIndex) => {
    const base =
      "relative w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer select-none ";

    if (!isSubmitted) {
      if (selectedOption === optionIndex) {
        return (
          base +
          "bg-[#FCE7F1] border-[#191919] text-[#191919] shadow-brutal -translate-y-0.5"
        );
      }
      return (
        base +
        "bg-[#FFFDF9] border-[#191919] text-[#191919] shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 hover:bg-[#F5F2EB]"
      );
    }

    const isSelected = selectedOption === optionIndex;
    const isCorrect = currentMcq.options[optionIndex] === currentMcq.correctAnswer;

    if (isCorrect) {
      return base + "bg-[#D1FAE5] border-[#191919] text-[#065F46] shadow-brutal";
    }

    if (isSelected && !isCorrect) {
      return base + "bg-[#FEE2E2] border-[#191919] text-[#991B1B] shadow-brutal";
    }

    return base + "bg-[#F5F2EB] border-[#E8E4DC] text-[#888888] opacity-60 cursor-not-allowed";
  };

  // Result view
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let emoji = "";

    if (percentage >= 80) {
      message = "Outstanding mastery! You crushed this exam!";
      emoji = "🏆";
    } else if (percentage >= 60) {
      message = "Solid score! A little more revision will make it perfect.";
      emoji = "🎯";
    } else if (percentage >= 40) {
      message = "Good start! Revisit your flashcards to solidify key facts.";
      emoji = "📚";
    } else {
      message = "Don't worry! Review the summary notes and give it another shot.";
      emoji = "💪";
    }

    return (
      <div className="max-w-lg mx-auto p-6 sm:p-10 bg-[#FFFDF9] rounded-[2.5rem] border-3 border-[#191919] shadow-brutal-lg text-center animate-in zoom-in-95 duration-200">
        <div className="text-5xl mb-4 animate-playful-float">{emoji}</div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF3D6] border border-[#191919] text-[#8A5800] text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quiz Summary</span>
        </div>
        <h2 className="text-3xl font-black text-[#191919] tracking-tight mb-2">
          Exam Completed!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#6B6B6B] mb-8 leading-relaxed">
          {message}
        </p>

        {/* Score Card */}
        <div className="bg-[#E85B9C] border-3 border-[#191919] rounded-[2rem] p-6 mb-8 shadow-brutal text-white">
          <p className="text-white/90 text-xs font-extrabold uppercase tracking-widest mb-1">
            Your Final Score
          </p>
          <div className="text-5xl font-black tracking-tight my-2">
            {score} <span className="text-2xl font-bold text-white/80">/ {questions.length}</span>
          </div>
          <div className="inline-block px-4 py-1 rounded-full bg-white/20 border border-white/40 text-sm font-black mt-2">
            {percentage}% Accuracy
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="btn-brutal h-12 px-6 rounded-2xl text-xs sm:text-sm font-extrabold bg-[#FFFDF9] text-[#191919] flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="btn-brutal h-12 px-7 rounded-2xl text-xs sm:text-sm font-extrabold bg-[#E85B9C] hover:bg-[#C93678] text-white shadow-brutal w-full cursor-pointer flex items-center justify-center gap-2">
              <span>Back to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFDF9] rounded-[2.5rem] border-3 border-[#191919] shadow-brutal-lg p-5 sm:p-8 flex flex-col">
      {/* Progress Header */}
      <div className="mb-6 pb-4 border-b-2 border-[#191919]">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#F5F2EB] border border-[#191919] text-xs font-black text-[#191919]">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <span className="text-xs font-black text-[#E85B9C]">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}% Completed
          </span>
        </div>

        {/* Playful Progress Bar */}
        <div className="w-full bg-[#F5F2EB] border-2 border-[#191919] rounded-full h-3.5 p-0.5 overflow-hidden">
          <div
            className="bg-[#E85B9C] h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question Content & Answers Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 mb-6">
        {/* Left: Question Box */}
        <div className="flex flex-col justify-between bg-[#F5F2EB] rounded-[2rem] border-2 border-[#191919] p-5 sm:p-6 shadow-brutal-sm">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#E85B9C] text-white text-[11px] font-black uppercase tracking-wider mb-3">
              Prompt
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#191919] leading-snug">
              {currentMcq.question}
            </h2>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#6B6B6B]">Live Score</span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#191919] text-xs font-black text-[#191919]">
              {score} / {questions.length} Correct
            </span>
          </div>
        </div>

        {/* Right: Answer Choices */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#6B6B6B] mb-3">
              Select the correct option
            </p>
            <div className="space-y-3">
              {currentMcq.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = isSubmitted && option === currentMcq.correctAnswer;
                const isWrong = isSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={getOptionClasses(index)}
                    disabled={isSubmitted}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl border-2 border-[#191919] flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected && !isSubmitted
                          ? "bg-[#E85B9C] text-white"
                          : isCorrect
                          ? "bg-[#10B981] text-white"
                          : isWrong
                          ? "bg-[#EF4444] text-white"
                          : "bg-white text-[#191919]"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 min-w-0 text-left leading-relaxed">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Submitted Feedback Box */}
            {isSubmitted && (
              <div
                className={`mt-4 p-4 rounded-2xl border-2 border-[#191919] text-xs sm:text-sm font-extrabold flex items-center gap-2.5 animate-in fade-in ${
                  currentMcq.options[selectedOption] === currentMcq.correctAnswer
                    ? "bg-[#D1FAE5] text-[#065F46]"
                    : "bg-[#FEE2E2] text-[#991B1B]"
                }`}
              >
                {currentMcq.options[selectedOption] === currentMcq.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-[#10B981]" />
                    <span>Correct! Great intuition.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0 text-[#EF4444]" />
                    <span>Incorrect. The correct answer was: {currentMcq.correctAnswer}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Action */}
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitted}
            className={`btn-brutal mt-5 w-full h-12 rounded-2xl font-black text-xs sm:text-sm ${
              isSubmitted
                ? "bg-[#F5F2EB] text-[#888888] border-[#191919] opacity-70"
                : "bg-[#E85B9C] hover:bg-[#C93678] text-white shadow-brutal"
            }`}
          >
            {isSubmitted ? "Answer Submitted" : "Submit Answer"}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-4 border-t-2 border-[#191919] mt-2">
        <Button
          onClick={handlePrevious}
          disabled={isFirst}
          variant="outline"
          className="btn-brutal h-10 px-4 rounded-xl text-xs font-black bg-[#FFFDF9] text-[#191919] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Previous</span>
        </Button>

        <span className="text-xs font-black text-[#6B6B6B]">
          {currentIndex + 1} / {questions.length}
        </span>

        <Button
          onClick={handleNext}
          disabled={isLast}
          className="btn-brutal h-10 px-5 rounded-xl text-xs font-black bg-[#E85B9C] hover:bg-[#C93678] text-white cursor-pointer"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
