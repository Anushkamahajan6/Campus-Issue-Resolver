import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth";
import StudentDashboard from "@/pages/student/dashboard";
import NewComplaint from "@/pages/student/new-complaint";
import ComplaintDetail from "@/pages/complaint-detail";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminComplaintDetail from "@/pages/admin/complaint-detail";

function ProtectedRoute({ component: Component, allowedRole }: { component: any, allowedRole?: 'student' | 'admin' }) {
  const { user } = useStore();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // If admin tries to access student page, maybe ok? But if student tries admin page, kick them out.
    if (allowedRole === 'admin' && user.role !== 'admin') {
      return <Redirect to="/dashboard" />;
    }
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function Router() {
  const { user } = useStore();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      
      {/* Auth */}
      <Route path="/auth">
        {user ? <Redirect to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : <AuthPage />}
      </Route>

      {/* Student Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={StudentDashboard} allowedRole="student" />
      </Route>
      <Route path="/complaints/new">
        <ProtectedRoute component={NewComplaint} allowedRole="student" />
      </Route>
      <Route path="/complaints/:id">
        <ProtectedRoute component={ComplaintDetail} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <ProtectedRoute component={AdminDashboard} allowedRole="admin" />
      </Route>
      <Route path="/admin/complaints/:id">
        <ProtectedRoute component={AdminComplaintDetail} allowedRole="admin" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
