"use client";
import { BookOpenCheck } from "lucide-react";
import { WalletCards } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
export default function LandingOptions() {
  return (
    <div className="flex justify-center items-center gap-5">
      <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl">
        <BookOpenCheck className="size-30 text-green-200 p-1" />
      </div>
      <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl">
        <WalletCards className="size-30 text-red-200 p-1" />
      </div>
      <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl">
        <ChartNoAxesCombined className="size-30 text-yellow-200 p-1" />
      </div>
    </div>
  );
}
