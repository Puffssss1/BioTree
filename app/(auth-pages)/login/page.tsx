"use client";
import { LoginForm } from "@/components/login-form";
import { Signup } from "@/components/signup-form";
import { useState } from "react";
import { Link2 } from "lucide-react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl mb-6">
                <Link2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to BioTree
              </h1>
              <p>Create you Bio Link </p>
            </div>

            {/* Login */}
            {isLogin ? (
              <LoginForm setIsLogin={setIsLogin} />
            ) : (
              <Signup setIsLogin={setIsLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
