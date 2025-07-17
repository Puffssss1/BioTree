import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignupProps = React.ComponentProps<"div"> & {
  setIsLogin: (value: boolean) => void;
};
interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    email: "john@example.com",
    password: "123456", // In real apps, never store plaintext passwords
    name: "John Doe",
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith",
  },
];

export function LoginForm({ className, setIsLogin, ...props }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function Login(email: string, password: string): User | null {
    const findUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    return findUser || null;
  }

  function hanldeLogin(e: React.FormEvent) {
    e.preventDefault();
    const user = Login(email, password);

    if (user) {
      toast.success("Welcom back!, You Successfully Login to your Account!!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
      console.log("login successful");
    } else {
      toast.error("User or Password is incorrect");
      console.log("user not found");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={hanldeLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            {/* ✅ Toggle login/signup instead of redirect */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="underline underline-offset-4 text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Create an Account
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
