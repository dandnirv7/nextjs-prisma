import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { NOTIFICATION_MESSAGES } from "@/utils/errorMessage";

export const ButtonLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast(NOTIFICATION_MESSAGES.success);
        router.push("/login");
      } else {
        const errorData = await response.json();
        toast({
          title: NOTIFICATION_MESSAGES.error.title,
          description: NOTIFICATION_MESSAGES.error.logoutFailed(
            errorData.message || "Unknown error occurred"
          ),
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: NOTIFICATION_MESSAGES.error.title,
          description: NOTIFICATION_MESSAGES.error.networkError(error.message),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className={`max-w-28 w-full ${isLoading ? "opacity-60" : ""}`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};
