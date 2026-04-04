"use client";
import { BookOpenCheck } from "lucide-react";
import { WalletCards } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { useRouter } from "next/navigation";
export default function LandingOptions() {
  const router = useRouter();

  const McqClick = () => {
    router.push("/dashboard");
    router.refresh();
  };
  const RevisionCard = () => {
    router.push("/revision-cards");
    router.refresh();
  };

  const PerformanceClick = () => {
    router.push("/performance");
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl">
        <button onClick={McqClick}>
          <BookOpenCheck className="size-30 text-green-200 p-1" />
        </button>
      </div>
      <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl">
        <button onClick={RevisionCard}>
          <WalletCards className="size-30 text-red-200 p-1" />
        </button>
      </div>
      <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl">
        <button onClick={PerformanceClick}>
          <ChartNoAxesCombined className="size-30 text-yellow-200 p-1" />
        </button>
      </div>
    </div>
  );
}
