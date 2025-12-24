import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useStore, Status } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  User,
  Mail,
  Save,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

export default function AdminComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const { complaints, updateComplaintStatus } = useStore();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const complaint = complaints.find((c) => c.id === id);

  // Local state for the form
  const [status, setStatus] = useState<Status>(complaint?.status || "PENDING");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!complaint) return <div>Complaint not found</div>;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Sim delay

    updateComplaintStatus(complaint.id, status);

    toast({
      title: "Changes saved",
      description: `Complaint ${complaint.id} updated to ${status}.`,
    });
    setIsSaving(false);
    setLocation("/admin");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/admin">
          <Button
            variant="ghost"
            size="sm"
            className="pl-0 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-serif">
                    Complaint Details
                  </CardTitle>
                  <CardDescription>ID: {complaint.id}</CardDescription>
                </div>
                <Badge
                  variant={
                    complaint.priority === "HIGH" ? "destructive" : "secondary"
                  }
                >
                  {complaint.priority} Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {complaint.imageUrl && (
                <div className="rounded-lg overflow-hidden border bg-muted/20">
                  <img
                    src={complaint.imageUrl}
                    alt="Evidence"
                    className="max-h-[400px] w-full object-contain"
                  />
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  DESCRIPTION
                </h3>
                <p className="text-base leading-relaxed">
                  {complaint.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    CATEGORY
                  </h3>
                  <p className="font-medium">{complaint.category}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    LOCATION
                  </h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="font-medium">{complaint.location || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    SUBMITTED BY
                  </h3>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="font-medium">{complaint.userEmail}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    DATE
                  </h3>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="font-medium">
                      {format(new Date(complaint.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <h3 className="text-sm font-bold text-accent-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  AI Insight
                </h3>
                <p className="text-sm text-foreground/80">
                  {complaint.aiSummary}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="border-sidebar-border shadow-md">
            <CardHeader className="bg-sidebar/5 border-b border-sidebar-border/50">
              <CardTitle className="text-lg">Resolution Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <select
                  className="w-full border rounded px-3 py-2"
                  defaultValue="PENDING"
                >
                  <option value="PENDING">Pending Review</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="PENDING">Resolved</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Admin Notes (Internal)</Label>
                <Textarea
                  placeholder="Add notes about the resolution process..."
                  className="min-h-[120px]"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Update Complaint"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reporter Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">{complaint.userEmail}</p>
                  <Button variant="link" className="h-auto p-0 text-xs">
                    Send Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
