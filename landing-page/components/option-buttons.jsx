"use client";
import toast from "react-hot-toast";
import { Button } from "../../src/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpenCheck, WalletCards, FileText, Loader2, Sparkles } from "lucide-react";
import { PDF_TOO_LARGE_ERROR } from "../../src/lib/pdf-upload";

const getReadableError = (message, fallback) => {
  const text = typeof message === "string" ? message : "";

  if (/unexpected token|not valid json|unexpected end of json/i.test(text)) {
    return fallback;
  }

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
  if (response.status === 413) {
    return PDF_TOO_LARGE_ERROR;
  }
  if (response.status >= 500) {
    return "The server couldn't process this PDF right now. Please try again.";
  }

  return getReadableError(data?.error, fallback);
};

const getRequestError = (error, fallback) => {
  if (
    error instanceof TypeError ||
    /failed to fetch|networkerror|load failed/i.test(error?.message || "")
  ) {
    return "Upload failed. Check your internet connection and try again.";
  }

  return getReadableError(error?.message, fallback);
};

const readApiResponse = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
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
      const data = await readApiResponse(response);
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
        getRequestError(
          error,
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
      const data = await readApiResponse(response);
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
        getRequestError(
          error,
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
      const data = await readApiResponse(response);
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
        getRequestError(
          error,
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
