"use client";
import toast from "react-hot-toast";
import { Button } from "../../src/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpenCheck, WalletCards, FileText, Loader2, Sparkles } from "lucide-react";

const getReadableError = (message, fallback) => {
  const text = typeof message === "string" ? message : "";

  if (/429|too many requests|rate limit|quota|resource exhausted/i.test(text)) {
    return "Too many requests. Please try again later.";
  }

  if (/api[_ ]?key|generative ai|gemini/i.test(text)) {
    return "AI service is temporarily unavailable. Please try again later.";
  }

  return text || fallback;
};

const getApiError = (response, data, fallback) => {
  if (response.status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  return getReadableError(data?.error, fallback);
};

export const OptionsButtons = ({ pdf, isProcessing, setIsProcessing }) => {
  const router = useRouter();

  // mcq created
  const Mcqhandler = async () => {
    try {
      setIsProcessing(true);
      if (!pdf) {
        toast.error("Please select a PDF file first");
        setIsProcessing(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", pdf);

      const response = await fetch("/api/actions/create-mcq", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          getApiError(
            response,
            data,
            "We couldn't process the PDF. Please try again.",
          ),
        );
      }

      toast.success("MCQs generated successfully!");
      router.push(`/mcq?contentId=${data.mcqId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        getReadableError(
          error.message,
          "We couldn't generate the MCQs. Please try again.",
        ),
      );
      setIsProcessing(false);
    }
  };

  // card created
  const Cardhandler = async () => {
    try {
      setIsProcessing(true);
      if (!pdf) {
        toast.error("Please select a PDF file first");
        setIsProcessing(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", pdf);

      const response = await fetch("/api/actions/create-cards", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          getApiError(
            response,
            data,
            "We couldn't process the PDF. Please try again.",
          ),
        );
      }

      toast.success("Flashcards created successfully!");
      router.push(`/revision-cards/${data.cardsId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        getReadableError(
          error.message,
          "We couldn't create the cards. Please try again.",
        ),
      );
      setIsProcessing(false);
    }
  };

  // summary created
  const Summaryhandler = async () => {
    try {
      setIsProcessing(true);
      if (!pdf) {
        toast.error("Please select a PDF file first");
        setIsProcessing(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", pdf);

      const response = await fetch("/api/actions/create-summary", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          getApiError(
            response,
            data,
            "We couldn't process the PDF. Please try again.",
          ),
        );
      }

      toast.success("Summary generated successfully!");
      router.push(`/summary/${data.summaryId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        getReadableError(
          error.message,
          "We couldn't create the summary. Please try again.",
        ),
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3.5 w-full mt-2">
      <Button
        className="btn-brutal h-12 px-6 rounded-2xl text-xs sm:text-sm font-extrabold bg-[#E85B9C] hover:bg-[#C93678] text-white shadow-brutal flex items-center gap-2 cursor-pointer"
        disabled={isProcessing}
        onClick={Mcqhandler}
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <BookOpenCheck className="w-4 h-4" />
        )}
        <span>Generate MCQs</span>
      </Button>

      <Button
        className="btn-brutal h-12 px-6 rounded-2xl text-xs sm:text-sm font-extrabold bg-[#FFF3D6] hover:bg-[#FDE68A] text-[#8A5800] shadow-brutal flex items-center gap-2 cursor-pointer"
        disabled={isProcessing}
        onClick={Cardhandler}
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <WalletCards className="w-4 h-4" />
        )}
        <span>Create Flashcards</span>
      </Button>

      <Button
        className="btn-brutal h-12 px-6 rounded-2xl text-xs sm:text-sm font-extrabold bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#065F46] shadow-brutal flex items-center gap-2 cursor-pointer"
        disabled={isProcessing}
        onClick={Summaryhandler}
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        <span>Make Summary</span>
      </Button>
    </div>
  );
};
