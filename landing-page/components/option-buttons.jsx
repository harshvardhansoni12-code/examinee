"use client";
import toast from "react-hot-toast";
import { Button } from "../../src/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const OptionsButtons = ({ pdf }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //mcq created
  const Mcqhandler = async () => {
    try {
      setLoading(true);
      if (!pdf) {
        toast.error("please select the pdf");
        setLoading(false);
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
        throw new Error(data.error || "Upload failed");
      }

      toast.success("PDF processed successfully!");
      router.push("/mcq");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  //card created
  const Cardhandler = async () => {
    try {
      setLoading(true);
      if (!pdf) {
        toast.error("please select the pdf");
        setLoading(false);
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
        throw new Error(data.error || "Upload failed");
      }

      toast.success("PDF processed successfully!");
      router.push("/revision-cards");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // summary created
  const Summaryhandler = async () => {
    try {
      setLoading(true);
      if (!pdf) {
        toast.error("please select the pdf");
        setLoading(false);
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
        throw new Error(data.error || "Upload failed");
      }

      toast.success("PDF processed successfully!");
      router.push("/summary");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ");
      setLoading(false);
    }
  };

  //
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 w-full mt-4">
      <Button 
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 border border-transparent" 
        disabled={loading} 
        onClick={Mcqhandler}
      >
        Generate MCQs
      </Button>
      <Button 
        variant="secondary" 
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800/50 dark:hover:bg-purple-900/40" 
        disabled={loading} 
        onClick={Cardhandler}
      >
        Create Cards
      </Button>
      <Button 
        variant="secondary" 
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50 dark:hover:bg-blue-900/40" 
        disabled={loading} 
        onClick={Summaryhandler}
      >
        Make Summary
      </Button>
    </div>
  );
};
