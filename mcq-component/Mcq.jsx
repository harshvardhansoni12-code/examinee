"use client";

import { useState } from "react";
import { Button } from "../src/components/ui/button";

export default function Mcq({ mcqData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track which questions are answered correctly

  // Parse MCQ data - handle JSON string from database or object from API
  const parseMcqData = (data) => {
    let questions = [];
    
    // Helper function to clean and parse JSON string
    const cleanAndParseJson = (jsonString) => {
      if (typeof jsonString !== "string") return null;
      
      // Remove markdown code blocks (```json or ```)
      let cleaned = jsonString.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
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
        <p className="text-gray-500 text-lg">No valid MCQs found. Please check your data.</p>
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
    
    // Only increment score if this question hasn't been answered correctly before
    if (isCorrect && !answeredQuestions[currentIndex]) {
      setScore(score + 1);
      setAnsweredQuestions({ ...answeredQuestions, [currentIndex]: true });
    }
  };

  const getOptionClassName = (optionIndex) => {
    const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
    
    if (!isSubmitted) {
      // Before submit - show selected state
      return baseClasses + (selectedOption === optionIndex
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50");
    }
    
    // After submit - show correct/incorrect
    const isSelected = selectedOption === optionIndex;
    const isCorrect = currentMcq.options[optionIndex] === currentMcq.correctAnswer;
    
    if (isCorrect) {
      return baseClasses + "border-green-500 bg-green-50"; // Correct answer - green
    }
    
    if (isSelected && !isCorrect) {
      return baseClasses + "border-red-500 bg-red-50"; // Selected wrong answer - red
    }
    
    return baseClasses + "border-gray-200 opacity-50"; // Other options
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
            <span className="text-gray-600">{option}</span>
          </button>
        ))}
      </div>

      {/* Score Display */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-800 font-medium text-center">
          Score: {score} / {questions.length} correct
        </p>
      </div>

      {/* Answer Feedback */}
      {isSubmitted && (
        <div className={`mb-6 p-4 rounded-lg border ${
          currentMcq.options[selectedOption] === currentMcq.correctAnswer
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}>
          <p className={`font-medium ${
            currentMcq.options[selectedOption] === currentMcq.correctAnswer
              ? "text-green-800"
              : "text-red-800"
          }`}>
            {currentMcq.options[selectedOption] === currentMcq.correctAnswer
              ? "✅ Correct!"
              : "❌ Incorrect!"}
          </p>
          <p className="text-gray-700 mt-2">
            Correct Answer: {currentMcq.correctAnswer}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={handleSubmit}
          disabled={selectedOption === null || isSubmitted}
          variant="outline"
          className={`flex-1 ${isSubmitted ? "opacity-50" : ""}`}
        >
          {isSubmitted ? "Submitted" : "Submit Answer"}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
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
