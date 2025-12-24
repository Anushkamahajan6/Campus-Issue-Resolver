import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-serif font-bold text-xl text-primary flex items-center gap-2">
            <span className="bg-primary text-primary-foreground p-1 rounded-md">CR</span>
            CampusResolve
          </div>
          <div className="flex gap-4">
            <Link href="/auth?tab=login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth?tab=register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Campus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          
          <div className="container relative z-10 px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground border border-accent/20 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium">AI-Powered Issue Resolution</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Better Campus,<br />
              <span className="text-accent">Resolved Faster.</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Report issues instantly, track progress in real-time, and let our AI assist administration in prioritizing what matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link href="/auth?tab=register">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-accent text-accent-foreground hover:bg-accent/90 border-0 shadow-xl shadow-accent/20">
                  Submit a Complaint
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth?tab=login">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard 
                icon={Zap}
                title="Instant Reporting"
                description="Snap a photo, add a location, and submit. Our AI categorizes and prioritizes your request immediately."
              />
              <FeatureCard 
                icon={CheckCircle2}
                title="Real-time Tracking"
                description="Never wonder about the status of your request. Get notified when your issue is received, processed, and resolved."
              />
              <FeatureCard 
                icon={ShieldCheck}
                title="Admin Dashboard"
                description="Powerful tools for campus administration to manage workflow, assign tasks, and analyze infrastructure health."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-muted border-t text-center text-muted-foreground text-sm">
        <p>© 2024 Campus Issue Resolver. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
