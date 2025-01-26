"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { LoginFormInner } from "@/components/auth/LoginFormInner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { type AuthData, authSchema } from "@/schemas/auth";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<AuthData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLoginSubmit(values: AuthData) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }

      if (data.data?.sessionId) {
        localStorage.setItem("sessionId", data.data.sessionId);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(ERROR_MESSAGES.LOGIN_FAILED);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="mx-auto min-w-[480px] max-w-[480px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <LoginFormInner
              onLoginSubmit={handleLoginSubmit}
              loading={isLoading}
              error={error}
            />
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline text-blue-500">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
