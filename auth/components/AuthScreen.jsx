"use client";
import UserSignUp from "./UserSignUp.jsx";
import UserSignIn from "./UserSignIn.jsx";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const AuthScreen = () => {
  const [state, setState] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center">
      {state == true ? (
        <UserSignIn state={state} setState={setState} />
      ) : (
        <UserSignUp state={state} setState={setState} />
      )}
    </div>
  );
};
