"use client";

import { RegisterFormInner } from "@/components/auth/RegisterFormInner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { type RegisterData, registerSchema } from "@/schemas/auth";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegisterSubmit(values: RegisterData) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || ERROR_MESSAGES.REGISTER_FAILED);
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(ERROR_MESSAGES.REGISTER_FAILED);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="mx-auto max-w-[480px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <RegisterFormInner
              onRegisterSubmit={handleRegisterSubmit}
              loading={isLoading}
              error={error}
            />
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-blue-500">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
