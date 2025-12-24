import React from "react";
import { useStore } from "@/lib/store";
import { Link, useLocation } from "wouter";
import {
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Menu,
  School
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useStore();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return <div className="min-h-screen">{children}</div>;
  }

  const isAdmin = user.role === "admin";

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <School className="h-6 w-6" />
          <span>CampusResolve</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs capitalize">{user.role}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2">
        {isAdmin ? (
          <NavItem href="/admin" icon={LayoutDashboard} active={location === "/admin"}>
            Dashboard
          </NavItem>
        ) : (
          <>
            <NavItem href="/dashboard" icon={LayoutDashboard} active={location === "/dashboard"}>
              My Complaints
            </NavItem>
            <NavItem href="/complaints/new" icon={PlusCircle} active={location === "/complaints/new"}>
              New Complaint
            </NavItem>
          </>
        )}
      </div>

      <div className="p-6 border-t">
        <Button onClick={handleLogout} className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r fixed inset-y-0 left-0">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <School className="h-5 w-5" />
          <span>CampusResolve</span>
        </div>

        <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <NavContent />
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 md:ml-64 min-h-screen",
          "pt-16 md:pt-0"
        )}
      >
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  active,
  children
}: {
  href: string;
  icon: any;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Button
        className={cn(
          "w-full justify-start mb-1",
          active ? "bg-gray-200 font-medium" : "bg-transparent"
        )}
      >
        <Icon className="mr-3 h-5 w-5" />
        {children}
      </Button>
    </Link>
  );
}
