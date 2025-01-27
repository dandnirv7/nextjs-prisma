"use client";

import AlertComponent from "@/components/AlertComponent";
import { ForgotPasswordInner } from "@/components/auth/ForgotPasswordFormInner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "hooks/use-toast";
import { type ForgotPasswordData, forgotPasswordSchema } from "@/schemas/auth";
import { NOTIFICATION_MESSAGES } from "@/utils/errorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const { toast } = useToast();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPasswordSubmit(values: ForgotPasswordData) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || NOTIFICATION_MESSAGES.error.forgotPassword.message
        );
      }

      toast({
        title: NOTIFICATION_MESSAGES.success.forgotPassword.title,
        description: NOTIFICATION_MESSAGES.success.forgotPassword.message,
      });

      if (data.data?.resetToken) {
        router.push(`reset-password/${data.data?.resetToken}`);
      }

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: NOTIFICATION_MESSAGES.error.forgotPassword.title,
          description: NOTIFICATION_MESSAGES.error.networkError.message(
            error.message
          ),
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="mx-auto min-w-[480px] max-w-[480px]">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            {error ? (
              <AlertComponent error={error} />
            ) : (
              <>Enter your email address to receive a password reset link.</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <ForgotPasswordInner
              onForgotPasswordSubmit={handleForgotPasswordSubmit}
              loading={isLoading}
              error={error}
            />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
