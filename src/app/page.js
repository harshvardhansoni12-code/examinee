"use client";

import { NavBar } from "../../landing-page/components/navbar/navbar.jsx";
import { BackGround } from "../../landing-page/components/background.jsx";
import { InputBar } from "../../landing-page/components/inputbar.jsx";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
export default function Home() {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="mt-50 text-center">
        {" "}
        <TypewriterEffect />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <BackGround />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <InputBar />
      </div>
    </div>
  );
}
