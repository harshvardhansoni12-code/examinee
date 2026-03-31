import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const UserSignUp = ({ setState }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess(data.message);
      setFullname("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="p-2 w-70">
        <CardTitle className="flex justify-center">SignUp Page</CardTitle>
        <CardDescription className="flex justify-center">
          Enter the details
        </CardDescription>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && (
          <div className="text-green-500 text-sm mb-2">{success}</div>
        )}
        <form onSubmit={handleSignUp}>
          <Input
            className="bg-white mb-2"
            type="text"
            placeholder="FullName"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
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
            {loading ? "Signing Up..." : "Sign Up"}
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
          Already have an account?
          <span
            className="hover:underline hover:text-blue-500"
            onClick={() => {
              setState((prev) => !prev);
            }}
          >
            Sign In
          </span>
        </div>
      </Card>
    </div>
  );
};

export default UserSignUp;
