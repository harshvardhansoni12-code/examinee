"use client";
import { X } from "lucide-react";

const previewText = (type, item) => {
  if (!item) return "Saved item";

  if (type === "mcq") {
    if (Array.isArray(item.mcq)) {
      return `Questions: ${item.mcq.length}`;
    }
    if (typeof item.mcq === "string") {
      try {
        const cleaned = item.mcq
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        const parsed = JSON.parse(cleaned);
        return parsed?.questions?.length
          ? `${parsed.questions.length} questions saved`
          : "Saved MCQ session";
      } catch (e) {
        return "Saved MCQ session";
      }
    }
    if (item.mcq && item.mcq.questions) {
      return `${item.mcq.questions.length} questions saved`;
    }
    return "Saved MCQ session";
  }

  if (type === "cards") {
    if (Array.isArray(item.cards) && item.cards.length > 0) {
      return item.cards[0].title || item.cards[0].subtitle || "Flashcard set";
    }
    return "Saved flashcards";
  }

  if (type === "summary") {
    if (typeof item.summary === "string") {
      return (
        item.summary.substring(0, 120) +
        (item.summary.length > 120 ? "..." : "")
      );
    }
    if (typeof item.summary === "object") {
      return (
        item.summary.content?.substring(0, 120) ||
        item.summary.summary?.substring(0, 120) ||
        "Saved summary"
      );
    }
    return "Saved summary";
  }

  return "Saved content";
};

const topicHeading = (type, item) => {
  if (!item) return null;

  if (type === "mcq") {
    if (item.title) {
      return item.title;
    }

    if (item.text?.text) {
      return item.text.text.split("\n")[0].slice(0, 80);
    }

    if (typeof item.mcq === "string") {
      try {
        const cleaned = item.mcq
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        const parsed = JSON.parse(cleaned);
        return parsed.topic || parsed.title || parsed.description || null;
      } catch (e) {
        return null;
      }
    }

    if (item.mcq?.title) {
      return item.mcq.title;
    }
  }

  if (type === "cards") {
    return item.title || item.cards?.[0]?.title || null;
  }

  if (type === "summary") {
    return item.title || item.summary?.title || null;
  }

  return null;
};

export default function ReviewTestList({
  type,
  items,
  loading,
  error,
  title,
  description,
  actionLabel,
  onReview,
  onClose,
}) {
  return (
    <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-2">{description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Close review list"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
          Loading previous content...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
          No previous content found. Process a document to store your first
          item.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                    Item #{item.id || index + 1}
                  </span>
                  {topicHeading(type, item) ? (
                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      {topicHeading(type, item)}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {previewText(type, item)}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <button
                    type="button"
                    onClick={() => onReview(item)}
                    className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                  >
                    {actionLabel}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
