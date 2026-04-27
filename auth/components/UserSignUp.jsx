"use client";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserSignUp = ({ setState }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create the user
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      if (response?.ok) {
        setSuccess("Account created successfully!");

        // Auto-login the user after signup
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (signInResult?.ok) {
          router.push("/dashboard");
          router.refresh();
        } else {
          setError(
            "Account created but login failed. Please try signing in manually.",
          );
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Signup failed. Please try again.");
      }
      setLoading(false);
    } catch (err) {
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-10">
      {/* Decorative Blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
      <div
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-60 -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Join us to start studying smarter
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm text-center font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <Input
              className="w-full h-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl px-4"
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
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
            {loading ? "Signing Up..." : "Sign Up"}
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
          Already have an account?{" "}
          <button
            onClick={() => setState((prev) => !prev)}
            className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
