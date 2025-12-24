import { useParams, Link } from 'wouter';
import { useStore, Status } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, MapPin, Calendar, User, Clock, CheckCircle, AlertCircle, Bot } from 'lucide-react';
import { format } from 'date-fns';

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const { complaints, user } = useStore();
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold">Complaint Not Found</h2>
        <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const statusColors: Record<Status, string> = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
    RESOLVED: "bg-green-100 text-green-800 border-green-200"
  };

  const statusIcons: Record<Status, any> = {
    PENDING: AlertCircle,
    IN_PROGRESS: Clock,
    RESOLVED: CheckCircle
  };

  const StatusIcon = statusIcons[complaint.status];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>
          <Button variant="ghost" size="sm" className="pl-0 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono">{complaint.id}</Badge>
                    <Badge variant="secondary">{complaint.category}</Badge>
                    <Badge variant="outline" className={complaint.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' : ''}>
                      {complaint.priority} PRIORITY
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-serif font-bold">{complaint.category} Issue</h1>
                </div>
                <Badge variant="outline" className={`px-3 py-1.5 text-sm font-medium ${statusColors[complaint.status]}`}>
                  <StatusIcon className="w-4 h-4 mr-1.5" />
                  {complaint.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {complaint.imageUrl && (
                <div className="rounded-lg overflow-hidden border">
                  <img src={complaint.imageUrl} alt="Evidence" className="w-full max-h-[400px] object-cover" />
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {complaint.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-0.5">Location</span>
                    <span className="font-medium">{complaint.location || 'Not specified'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-0.5">Submitted On</span>
                    <span className="font-medium">{format(new Date(complaint.createdAt), 'PPP p')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-0.5">Submitted By</span>
                    <span className="font-medium">{complaint.userEmail}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-accent-foreground" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase">Summary</span>
                <p className="text-sm leading-relaxed">{complaint.aiSummary}</p>
              </div>
              <Separator className="bg-accent/10" />
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase">Suggested Action</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Dispatch maintenance team for assessment. High priority due to safety implications.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {user?.role === 'admin' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                 <Link href={`/admin/complaints/${complaint.id}`}>
                   <Button className="w-full">Manage Issue</Button>
                 </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
