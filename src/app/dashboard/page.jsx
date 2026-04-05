"use client";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import { InputBar } from "../../../landing-page/components/inputbar.jsx";
import LandingOptions from "../../../landing-page/components/landing-options";
import { OptionsButtons } from "../../../landing-page/components/option-buttons";
import { useState } from "react";
export default function Dashboard() {
  const [pdf, setPdf] = useState();
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
        <InputBar pdf={pdf} setPdf={setPdf} />
      </div>
      <div className="flex justify-center mt-10 gap-5">
        <OptionsButtons pdf={pdf} />
      </div>
    </div>
  );
}
