import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const UserSignUp = ({ setState }) => {
  return (
    <div>
      <Card className="p-2 w-70">
        <CardTitle className="flex justify-center">SignUp Page</CardTitle>
        <CardDescription className="flex justify-center">
          Enter the details
        </CardDescription>
        <Input
          className="bg-white"
          type="text"
          placeholder=" FullName"
          required
        />
        <Input className="bg-white" type="email" placeholder="email" required />
        <Input
          className="bg-white"
          type="text"
          placeholder="password"
          required
        />
        <Button className="w-full">sign Up</Button>
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
