"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RoleName } from "@prisma/client";
import { AuthUser } from "@/lib/auth/types";

interface AuthGuardClientProps {
  children: ReactNode;
  user: AuthUser | null;
  requiredRole?: RoleName;
}

export function AuthGuardClient({
  children,
  user,
  requiredRole,
}: AuthGuardClientProps) {
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  if (requiredRole && user.role.name !== requiredRole) {
    router.push("/unauthorized");
    return null;
  }

  return <>{children}</>;
}
