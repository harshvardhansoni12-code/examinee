"use client";
import UserSignUp from "./UserSignUp.jsx";
import UserSignIn from "./UserSignIn.jsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const AuthScreen = () => {
  const [state, setState] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, status]);

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center px-4 py-12 bg-paper-grid">
      {state === true ? (
        <UserSignIn
          state={state}
          setState={setState}
          isAuthenticating={isAuthenticating}
          setIsAuthenticating={setIsAuthenticating}
        />
      ) : (
        <UserSignUp
          state={state}
          setState={setState}
          isAuthenticating={isAuthenticating}
          setIsAuthenticating={setIsAuthenticating}
        />
      )}
    </div>
  );
};
