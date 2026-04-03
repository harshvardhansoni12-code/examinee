import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result?.error || "Invalid email or password");
      }
    } catch (error) {
      router.push("/authpage");
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="p-2 w-70">
        <CardTitle className="flex justify-center">Login Page</CardTitle>
        <CardDescription className="flex justify-center">
          Enter the details
        </CardDescription>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSignIn}>
          <Input
            className="bg-white mb-2"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            className="bg-white mb-2"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Separator />
        <Button className="w-full" variant="outline">
          Login with Google
        </Button>
        <Button className="w-full" variant="outline">
          Login with Github
        </Button>
        <div className="flex justify-center items-center">
          Don't have an account?
          <span
            className="hover:underline hover:text-blue-500"
            onClick={() => {
              setState((prev) => !prev);
            }}
          >
            Sign Up
          </span>
        </div>
      </Card>
    </div>
  );
};

export default UserSignIn;
