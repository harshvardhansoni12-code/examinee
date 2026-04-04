"use client";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import { InputBar } from "../../../landing-page/components/inputbar.jsx";
import LandingOptions from "../../../landing-page/components/landing-options";
export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="text-4xl font-bold mb-20">
          <TypewriterEffect />
        </div>
      </div>
      <div className="mb-10">
        <LandingOptions />
      </div>
      <div className="flex justify-center">
        <InputBar />
      </div>
    </div>
  );
}
