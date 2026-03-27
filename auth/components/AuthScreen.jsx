"use client";
import UserSignUp from "../components/UserSignUp";
import UserSignIn from "../components/UserSignIn";
import { useState } from "react";
export const AuthScreen = () => {
  const [state, setState] = useState(true);
  return (
    <div>
      {state == true ? (
        <UserSignIn state={state} setState={setState} />
      ) : (
        <UserSignUp state={state} setState={setState} />
      )}
    </div>
  );
};
