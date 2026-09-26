"use client";
import { X, BookOpenCheck, WalletCards, FileText, ArrowRight, ArrowLeft, Sparkles, Inbox, Loader2 } from "lucide-react";

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
          ? `${parsed.questions.length} questions saved in this test`
          : "Saved MCQ session";
      } catch (e) {
        return "Saved MCQ session";
      }
    }
    if (item.mcq && item.mcq.questions) {
      return `${item.mcq.questions.length} questions saved in this test`;
    }
    return "Saved MCQ session";
  }

  if (type === "cards") {
    if (Array.isArray(item.cards) && item.cards.length > 0) {
      return item.cards[0].title || item.cards[0].subtitle || "Flashcard set";
    }
    return "Saved flashcard deck";
  }

  if (type === "summary") {
    if (typeof item.summary === "string") {
      return (
        item.summary.substring(0, 140) +
        (item.summary.length > 140 ? "..." : "")
      );
    }
    if (typeof item.summary === "object") {
      return (
        item.summary.content?.substring(0, 140) ||
        item.summary.summary?.substring(0, 140) ||
        "Saved study summary"
      );
    }
    return "Saved study summary";
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

const getTypeTheme = (type) => {
  if (type === "mcq") {
    return {
      badgeBg: "bg-[#FCE7F1]",
      badgeText: "text-[#C93678]",
      badgeIcon: BookOpenCheck,
      btnBg: "bg-[#E85B9C] hover:bg-[#C93678] text-white",
      label: "Mock Test",
    };
  }
  if (type === "cards") {
    return {
      badgeBg: "bg-[#FFF3D6]",
      badgeText: "text-[#8A5800]",
      badgeIcon: WalletCards,
      btnBg: "bg-[#F59E0B] hover:bg-[#D97706] text-white",
      label: "Flashcards",
    };
  }
  return {
    badgeBg: "bg-[#D1FAE5]",
    badgeText: "text-[#065F46]",
    badgeIcon: FileText,
    btnBg: "bg-[#10B981] hover:bg-[#059669] text-white",
    label: "Summary",
  };
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
  const theme = getTypeTheme(type);
  const IconComponent = theme.badgeIcon;

  return (
    <div className="rounded-[2.5rem] border-3 border-[#191919] bg-[#FFFDF9] p-6 sm:p-10 shadow-brutal-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b-2 border-[#191919] mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#191919] text-xs font-black uppercase tracking-wider mb-2" style={{ backgroundColor: type === "mcq" ? "#FCE7F1" : type === "cards" ? "#FFF3D6" : "#D1FAE5", color: type === "mcq" ? "#C93678" : type === "cards" ? "#8A5800" : "#065F46" }}>
            <IconComponent className="w-3.5 h-3.5" />
            <span>{theme.label} Archives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#191919] tracking-tight">{title}</h2>
          <p className="text-xs sm:text-sm font-semibold text-[#6B6B6B] mt-1">{description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn-brutal self-start sm:self-center inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFFDF9] hover:bg-[#F5F2EB] text-[#191919] cursor-pointer"
          aria-label="Close review list"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* States */}
      {loading ? (
        <div className="rounded-3xl border-2 border-dashed border-[#191919] bg-[#F5F2EB] p-12 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#E85B9C]" />
          <p className="text-sm font-bold text-[#191919]">Loading your study sessions...</p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border-2 border-[#EF4444] bg-[#FEE2E2] p-8 text-center text-xs sm:text-sm font-bold text-[#991B1B]">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#191919] bg-[#F5F2EB] p-12 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFDF9] border-2 border-[#191919] flex items-center justify-center shadow-brutal-sm">
            <Inbox className="w-6 h-6 text-[#6B6B6B]" />
          </div>
          <h3 className="text-base font-black text-[#191919]">No Saved Content Yet</h3>
          <p className="text-xs font-semibold text-[#6B6B6B] max-w-sm">
            Upload a PDF on your dashboard to generate your first set of {theme.label.toLowerCase()}s.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="card-brutal rounded-[2rem] bg-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 rounded-full ${theme.badgeBg} border border-[#191919] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider ${theme.badgeText}`}>
                    <IconComponent className="w-3 h-3" />
                    Session #{item.id || index + 1}
                  </span>
                  {item.createdAt && (
                    <span className="text-[11px] font-bold text-[#888888]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {topicHeading(type, item) ? (
                  <h3 className="text-lg sm:text-xl font-black text-[#191919] mb-1.5 leading-snug truncate">
                    {topicHeading(type, item)}
                  </h3>
                ) : null}

                <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed line-clamp-2">
                  {previewText(type, item)}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onReview(item)}
                  className={`btn-brutal ${theme.btnBg} px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer`}
                >
                  <span>{actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
