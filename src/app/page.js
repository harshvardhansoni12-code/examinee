"use client";

import { AuthScreen } from "../../auth/components/AuthScreen";
import { BackGround } from "../../landing-page/components/background";
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-auto w-70 m-1.5">
        <BackGround />
        <div className="absolute inset-0 flex justify-center items-center">
          <AuthScreen />
        </div>
      </div>
    </div>
  );
}
