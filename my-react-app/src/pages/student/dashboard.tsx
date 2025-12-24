import { useStore, Complaint, Status } from '@/lib/store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import { formatDistanceToNow } from 'date-fns';

export default function StudentDashboard() {
  const { complaints, user } = useStore();
  
  // Filter complaints for the logged-in user
  const myComplaints = complaints.filter(c => c.userId === user?.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">My Complaints</h1>
          <p className="text-muted-foreground mt-1">Track the status of your reported issues.</p>
        </div>
        <Link href="/complaints/new">
          <Button size="lg" className="shadow-lg shadow-primary/20">
            Submit New Complaint
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myComplaints.length > 0 ? (
          myComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-card rounded-xl border border-dashed">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No complaints yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
              You haven't submitted any complaints. Help improve the campus by reporting issues you see.
            </p>
            <Link href="/complaints/new">
              <Button variant="outline">Submit your first complaint</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const statusColors: Record<Status, string> = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    RESOLVED: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
  };

  const statusIcons: Record<Status, any> = {
    PENDING: AlertCircle,
    IN_PROGRESS: Clock,
    RESOLVED: CheckCircle
  };

  const StatusIcon = statusIcons[complaint.status];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-border/60">
      {complaint.imageUrl && (
        <div className="h-40 overflow-hidden relative">
          <img 
            src={complaint.imageUrl} 
            alt={complaint.category} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white backdrop-blur-sm shadow-sm border-0">
            {complaint.category}
          </Badge>
        </div>
      )}
      <CardHeader className={!complaint.imageUrl ? "pb-2" : "pt-4 pb-2"}>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={statusColors[complaint.status]}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {complaint.status.replace('_', ' ')}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {complaint.id}
          </span>
        </div>
        {!complaint.imageUrl && (
          <div className="mb-2">
            <Badge variant="secondary">{complaint.category}</Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">
          {complaint.description}
        </p>
        
        <div className="flex flex-col gap-2 text-xs text-muted-foreground/80">
          {complaint.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{complaint.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(new Date(complaint.createdAt))} ago</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/complaints/${complaint.id}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5 group-hover:text-primary transition-colors">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
