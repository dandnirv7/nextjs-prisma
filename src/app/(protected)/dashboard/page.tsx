import { AuthGuard } from "@/components/auth/AuthGuard";
import { ClientDashboard } from "@/components/ClientDashboard";

export default function DashboardPage() {
  return (
    <AuthGuard requiredRole="admin">
      <ClientDashboard />
    </AuthGuard>
  );
}
