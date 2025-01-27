"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "hooks/use-toast";
import { type ResetPasswordData, resetPasswordSchema } from "@/schemas/auth";
import { ERROR_MESSAGES, NOTIFICATION_MESSAGES } from "@/utils/errorMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertComponent from "./AlertComponent";
import { ResetPasswordFormInner } from "./auth/ResetPasswordFormInner";

type ResetPasswordForm = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordForm) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function handleResetPassword(values: ResetPasswordData) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, password: values.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === ERROR_MESSAGES.SAME_PASSWORD) {
          setError(ERROR_MESSAGES.SAME_PASSWORD);
        }
        if (response.status === 400) {
          throw new Error(NOTIFICATION_MESSAGES.error.invalidToken.message);
        }
        throw new Error(
          data.message || NOTIFICATION_MESSAGES.error.resetPassword.message
        );
      }

      toast({
        title: NOTIFICATION_MESSAGES.success.resetPassword.title,
        description: NOTIFICATION_MESSAGES.success.resetPassword.message,
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
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
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            {error ? (
              <AlertComponent error={error} />
            ) : (
              <>Enter your new password to reset your password.</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <ResetPasswordFormInner
              onResetPasswordSubmit={handleResetPassword}
              loading={isLoading}
            />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
