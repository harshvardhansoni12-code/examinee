"use client";
import toast from "react-hot-toast";
import { Button } from "../../src/components/ui/button";
import { useRouter } from "next/navigation";

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
  //mcq created
  const Mcqhandler = async () => {
    try {
      setIsProcessing(true);
      if (!pdf) {
        toast.error("please select the pdf");
        setIsProcessing(false);
        return;
      }

      // Create FormData and send the actual file
      const formData = new FormData();
      formData.append("file", pdf);

      const response = await fetch("/api/actions/create-mcq", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(
          getApiError(
            response,
            data,
            "We couldn't process the PDF. Please try again.",
          ),
        );
      }

      toast.success("PDF processed successfully!");
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
  //card created
  const Cardhandler = async () => {
    try {
      setIsProcessing(true);
      if (!pdf) {
        toast.error("please select the pdf");
        setIsProcessing(false);
        return;
      }

      // Create FormData and send the actual file
      const formData = new FormData();
      formData.append("file", pdf);

      const response = await fetch("/api/actions/create-cards", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(
          getApiError(
            response,
            data,
            "We couldn't process the PDF. Please try again.",
          ),
        );
      }

      toast.success("PDF processed successfully!");
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
        toast.error("please select the pdf");
        setIsProcessing(false);
        return;
      }

      // Create FormData and send the actual file
      const formData = new FormData();
      formData.append("file", pdf);

      const response = await fetch("/api/actions/create-summary", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(
          getApiError(
            response,
            data,
            "We couldn't process the PDF. Please try again.",
          ),
        );
      }

      toast.success("PDF processed successfully!");
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

  //
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 w-full mt-4">
      <Button
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all bg-white text-slate-600 hover:bg-white border border-gray-200"
        disabled={isProcessing}
        onClick={Mcqhandler}
      >
        Generate MCQs
      </Button>
      <Button
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all bg-white text-slate-600 hover:bg-white border border-gray-200"
        disabled={isProcessing}
        onClick={Cardhandler}
      >
        Create Cards
      </Button>
      <Button
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all bg-white text-slate-600 hover:bg-white border border-gray-200"
        disabled={isProcessing}
        onClick={Summaryhandler}
      >
        Make Summary
      </Button>
    </div>
  );
};
