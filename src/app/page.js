"use client";

import { NavBar } from "../../landing-page/components/navbar/navbar.jsx";
import { BackGround } from "../../landing-page/components/background.jsx";
import { InputBar } from "../../landing-page/components/inputbar.jsx";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AuthScreen } from "./authpage/AuthScreen.jsx";
export default function Home() {
  return (
    <div>
      <BackGround />
      <h1>home page</h1>
    </div>
  );
}
