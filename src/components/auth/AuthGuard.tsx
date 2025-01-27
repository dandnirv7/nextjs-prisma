import { getSession } from "@/lib/auth/session";
import { RoleName } from "@prisma/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { AuthGuardClient } from "./AuthGuardClient";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: RoleName;
}

export async function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.user) {
    redirect("/login");
  }

  if (requiredRole && session.user.role.name !== requiredRole) {
    redirect("/unauthorized");
  }

  return (
    <AuthGuardClient user={session.user} requiredRole={requiredRole}>
      {children}
    </AuthGuardClient>
  );
}
