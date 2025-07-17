import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignupProps = React.ComponentProps<"div"> & {
  setIsLogin: (value: boolean) => void;
};

export function Signup({ className, setIsLogin, ...props }: SignupProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Create your Bio Tree account and share your bio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Create
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            {/* ✅ Toggle login/signup instead of redirect */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="underline underline-offset-4 text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
