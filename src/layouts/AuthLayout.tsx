import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { authenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/login" replace />;
}
