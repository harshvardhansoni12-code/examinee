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
    <div className="flex justify-center items-center max-w-72 gap-20">
      <div className=" flex items-center">
        <Button variant={"mcq"} disabled={loading} onClick={Mcqhandler}>
          Mcq
        </Button>
      </div>
      <div className="flex items-center">
        <Button variant={"cards"} disabled={loading} onClick={Cardhandler}>
          Cards
        </Button>
      </div>
      <div className="flex items-center">
        <Button variant={"summary"} disabled={loading} onClick={Summaryhandler}>
          summary
        </Button>
      </div>
    </div>
  );
};
