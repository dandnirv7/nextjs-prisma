import { AuthGuard } from "@/components/auth/AuthGuard";

export default async function DashboardPage() {
  return (
    <AuthGuard requiredRole="admin">
      <div>Dashboard Content</div>
    </AuthGuard>
  );
}
