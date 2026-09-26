"use client";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

const UserSignIn = ({ setState, isAuthenticating, setIsAuthenticating }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        router.replace("/dashboard");
        router.refresh();
      } else {
        setError(
          result?.error === "CredentialsSignin"
            ? "The email or password is incorrect. Please check your details and try again."
            : "We couldn't sign you in. Please try again in a moment.",
        );
      }
    } catch (error) {
      setError(
        "We couldn't connect to the sign-in service. Check your internet connection and try again.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleProviderSignIn = (provider) => {
    setIsAuthenticating(true);
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-10">
      {/* Playful Floating Badge */}
      <div className="absolute -top-4 -right-2 bg-[#FFF3D6] text-[#8A5800] border-2 border-[#191919] px-3.5 py-1 rounded-full text-xs font-black shadow-brutal-sm z-20 transform rotate-3 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 fill-[#8A5800]" />
        <span>STUDENT LOGIN</span>
      </div>

      <div className="bg-[#FFFDF9] p-8 sm:p-10 rounded-[2.5rem] shadow-brutal-lg border-3 border-[#191919]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FCE7F1] border-2 border-[#191919] flex items-center justify-center text-[#C93678] font-black mx-auto mb-4 shadow-brutal-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black text-[#191919] tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-sm font-semibold text-[#6B6B6B] mt-1.5">
            Log in to continue your personalized study journey
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-[#FEE2E2] border-2 border-[#EF4444] text-[#991B1B] rounded-2xl text-xs font-bold flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444] mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Sign in Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-[#191919] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isAuthenticating}
                required
                className="pl-11"
              />
              <Mail className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#191919] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isAuthenticating}
                required
                className="pl-11"
              />
              <Lock className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <Button
            type="submit"
            className="btn-brutal w-full h-12 bg-[#E85B9C] hover:bg-[#C93678] text-white rounded-2xl font-black text-sm tracking-wide shadow-brutal flex items-center justify-center gap-2 cursor-pointer mt-2"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t-2 border-[#E8E4DC]"></div>
          <span className="mx-4 text-[11px] font-black text-[#888888] uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-grow border-t-2 border-[#E8E4DC]"></div>
        </div>

        {/* Social Auth */}
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            className="btn-brutal h-12 w-full rounded-2xl bg-[#FFFDF9] hover:bg-[#F5F2EB] text-[#191919] font-bold text-sm border-2 border-[#191919] shadow-brutal-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            onClick={() => handleProviderSignIn("github")}
            disabled={isAuthenticating}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Bottom Switcher */}
        <div className="mt-8 text-center text-xs font-bold text-[#6B6B6B]">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => setState((prev) => !prev)}
            disabled={isAuthenticating}
            className="text-[#E85B9C] font-black hover:text-[#C93678] underline ml-1 cursor-pointer"
          >
            Create one free →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
