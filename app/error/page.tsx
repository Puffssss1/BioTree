"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Something went wrong!
          </CardTitle>
          <CardDescription>
            An error occurred during your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && <p className="text-red-500 text-center">{message}</p>}
          <p className="text-muted-foreground text-center">
            Please try again. If the issue persists, contact support.
          </p>
          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
