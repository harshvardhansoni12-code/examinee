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
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all bg-white text-slate-600 hover:bg-white border border-gray-200"
        disabled={loading}
        onClick={Mcqhandler}
      >
        Generate MCQs
      </Button>
      <Button
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all bg-white text-slate-600 hover:bg-white border border-gray-200"
        disabled={loading}
        onClick={Cardhandler}
      >
        Create Cards
      </Button>
      <Button
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all bg-white text-slate-600 hover:bg-white border border-gray-200"
        disabled={loading}
        onClick={Summaryhandler}
      >
        Make Summary
      </Button>
    </div>
  );
};
