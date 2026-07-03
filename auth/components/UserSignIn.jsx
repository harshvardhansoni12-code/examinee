"use client";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const UserSignIn = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        setLoading(false);
        router.replace("/dashboard");
        router.refresh();
      } else {
        setError(result?.error || "Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-10">
      {/* Decorative Blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Enter your details to sign in
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <Input
              className="w-full h-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl px-4"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              className="w-full h-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl px-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full h-12 bg-white text-slate-900 hover:bg-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold shadow-sm"
          >
            Google
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold shadow-sm"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            GitHub
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don't have an account?{" "}
          <button
            onClick={() => setState((prev) => !prev)}
            className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
