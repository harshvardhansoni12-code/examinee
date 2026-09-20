"use client";
import UserSignUp from "./UserSignUp.jsx";
import UserSignIn from "./UserSignIn.jsx";
import { useState } from "react";
export const AuthScreen = () => {
  const [state, setState] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
      {state == true ? (
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
