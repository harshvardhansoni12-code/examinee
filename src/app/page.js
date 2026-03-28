"use client";

import { NavBar } from "../../landing-page/components/navbar/navbar";
import { BackGround } from "../../landing-page/components/background";
import { InputBar } from "../../landing-page/components/inputbar";
export default function Home() {
  return (
    <div>
      <NavBar />

      <div className="flex items-center justify-center min-h-screen">
        <BackGround />
        {/* <div className="h-auto w-70 m-1.5">
          
          {/* <div className="absolute inset-0 flex justify-center items-center">
          <AuthScreen />
        </div> 
         
        </div> */}
        <InputBar />
      </div>
    </div>
  );
}
