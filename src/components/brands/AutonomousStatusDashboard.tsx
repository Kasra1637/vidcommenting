 import { useState, useEffect } from "react";
 import { Progress } from "@/components/ui/progress";
 import {
   Sparkles,
   Search,
   CheckCircle,
   Send,
   Video,
   MessageSquare,
   Zap,
   Clock,
   TrendingUp,
   AlertCircle,
   Loader2,
 } from "lucide-react";
 
 interface AutonomousStatusDashboardProps {
   brandName: string;
   isActive?: boolean;
 }
 
 interface StatusItem {
   label: string;
   status: "idle" | "active" | "completed" | "waiting";
   count?: number;
   detail?: string;
 }
 
 interface PipelineStats {
   discovery: StatusItem;
   generation: StatusItem;
   evaluation: StatusItem;
   approval: StatusItem;
   posting: StatusItem;
 }
 
 export const AutonomousStatusDashboard = ({
   brandName,
   isActive = true,
 }: AutonomousStatusDashboardProps) => {
   const [stats, setStats] = useState<PipelineStats>({
     discovery: { label: "Auto Discovery", status: "active", count: 12, detail: "Scanning YouTube & TikTok" },
     generation: { label: "Comment Generation", status: "active", count: 36, detail: "3 candidates per video" },
     evaluation: { label: "Quality Evaluation", status: "active", count: 28, detail: "Scoring authenticity" },
     approval: { label: "Smart Approval", status: "waiting", count: 24, detail: "Queued for posting" },
     posting: { label: "Auto Posting", status: "idle", count: 8, detail: "Posted today" },
   });
 
   const [quotaUsed, setQuotaUsed] = useState(15);
   const [dailyQuota] = useState(20);
 
   // Simulate real-time updates
   useEffect(() => {
     if (!isActive) return;
 
     const interval = setInterval(() => {
       setStats((prev) => ({
         ...prev,
         discovery: {
           ...prev.discovery,
           count: Math.min((prev.discovery.count || 0) + Math.floor(Math.random() * 2), 50),
         },
         generation: {
           ...prev.generation,
           count: (prev.discovery.count || 0) * 3,
         },
         evaluation: {
           ...prev.evaluation,
           count: Math.floor((prev.generation.count || 0) * 0.8),
         },
         approval: {
           ...prev.approval,
           count: Math.floor((prev.evaluation.count || 0) * 0.85),
         },
       }));
     }, 5000);
 
     return () => clearInterval(interval);
   }, [isActive]);
 
   const getStatusIcon = (status: StatusItem["status"]) => {
     switch (status) {
       case "active":
         return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
       case "completed":
         return <CheckCircle className="h-4 w-4 text-success" />;
       case "waiting":
         return <Clock className="h-4 w-4 text-warning" />;
       default:
         return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
     }
   };
 
   const getStatusBadge = (status: StatusItem["status"]) => {
     const styles = {
       active: "bg-primary/10 text-primary",
       completed: "bg-success/10 text-success",
       waiting: "bg-warning/10 text-warning",
       idle: "bg-muted text-muted-foreground",
     };
     const labels = {
       active: "Active",
       completed: "Done",
       waiting: "Queued",
       idle: "Idle",
     };
     return (
       <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
         {labels[status]}
       </span>
     );
   };
 
   return (
     <div className="space-y-6">
       {/* AI Working Header */}
       <div className="rounded-xl border bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 p-6">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="relative">
               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                 <Sparkles className="h-7 w-7 text-primary" />
               </div>
               {isActive && (
                 <span className="absolute -right-1 -top-1 flex h-4 w-4">
                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                   <span className="relative inline-flex h-4 w-4 rounded-full bg-success"></span>
                 </span>
               )}
             </div>
             <div>
               <h2 className="text-xl font-bold text-foreground">
                 AI is working for {brandName}
               </h2>
               <p className="text-sm text-muted-foreground">
                 Fully autonomous • No manual intervention required
               </p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-sm text-muted-foreground">Daily Quota</p>
             <p className="text-lg font-semibold">
               {quotaUsed}/{dailyQuota} videos
             </p>
             <Progress value={(quotaUsed / dailyQuota) * 100} className="mt-1 h-2 w-24" />
           </div>
         </div>
       </div>
 
       {/* Pipeline Status Grid */}
       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
         {/* Auto Discovery */}
         <div className="rounded-xl border bg-card p-5">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                 <Search className="h-5 w-5 text-primary" />
               </div>
               <span className="font-medium">Auto Discovery</span>
             </div>
             {getStatusBadge(stats.discovery.status)}
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Videos found today</span>
               <span className="font-semibold">{stats.discovery.count}</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
               {getStatusIcon(stats.discovery.status)}
               <span>{stats.discovery.detail}</span>
             </div>
             <div className="flex gap-2 mt-3">
               <span className="rounded-full bg-muted px-2 py-1 text-xs">YouTube</span>
               <span className="rounded-full bg-muted px-2 py-1 text-xs">TikTok</span>
             </div>
           </div>
         </div>
 
         {/* Comment Generation */}
         <div className="rounded-xl border bg-card p-5">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10">
                 <MessageSquare className="h-5 w-5 text-info" />
               </div>
               <span className="font-medium">Generation</span>
             </div>
             {getStatusBadge(stats.generation.status)}
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Comments generated</span>
               <span className="font-semibold">{stats.generation.count}</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
               {getStatusIcon(stats.generation.status)}
               <span>{stats.generation.detail}</span>
             </div>
           </div>
         </div>
 
         {/* Quality Evaluation */}
         <div className="rounded-xl border bg-card p-5">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                 <TrendingUp className="h-5 w-5 text-warning" />
               </div>
               <span className="font-medium">Evaluation</span>
             </div>
             {getStatusBadge(stats.evaluation.status)}
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">High-quality passed</span>
               <span className="font-semibold">{stats.evaluation.count}</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
               {getStatusIcon(stats.evaluation.status)}
               <span>{stats.evaluation.detail}</span>
             </div>
             <div className="mt-2">
               <div className="flex items-center justify-between text-xs mb-1">
                 <span className="text-muted-foreground">Avg. authenticity</span>
                 <span className="text-success font-medium">94%</span>
               </div>
               <Progress value={94} className="h-1.5" />
             </div>
           </div>
         </div>
 
         {/* Smart Approval */}
         <div className="rounded-xl border bg-card p-5">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                 <CheckCircle className="h-5 w-5 text-success" />
               </div>
               <span className="font-medium">Smart Approval</span>
             </div>
             {getStatusBadge(stats.approval.status)}
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Approved for posting</span>
               <span className="font-semibold">{stats.approval.count}</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
               {getStatusIcon(stats.approval.status)}
               <span>{stats.approval.detail}</span>
             </div>
             <div className="mt-2 flex gap-2">
               <span className="rounded-full bg-success/10 px-2 py-1 text-xs text-success">
                 Auto: {Math.floor((stats.approval.count || 0) * 0.7)}
               </span>
               <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                 90%+ match: {Math.floor((stats.approval.count || 0) * 0.3)}
               </span>
             </div>
           </div>
         </div>
 
         {/* Auto Posting */}
         <div className="rounded-xl border bg-card p-5">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                 <Send className="h-5 w-5 text-accent-foreground" />
               </div>
               <span className="font-medium">Auto Posting</span>
             </div>
             {getStatusBadge(stats.posting.status)}
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Posted today</span>
               <span className="font-semibold">{stats.posting.count}</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
               {getStatusIcon(stats.posting.status)}
               <span>{stats.posting.detail}</span>
             </div>
             <p className="text-xs text-muted-foreground mt-2">
               Following platform rate limits
             </p>
           </div>
         </div>
 
         {/* Summary Card */}
         <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-success/5 p-5">
           <div className="flex items-center gap-2 mb-3">
             <Zap className="h-5 w-5 text-primary" />
             <span className="font-medium">Pipeline Summary</span>
           </div>
           <div className="space-y-3">
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Success rate</span>
               <span className="font-semibold text-success">96%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Avg. reach/comment</span>
               <span className="font-semibold">12.4K</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">Est. daily reach</span>
               <span className="font-semibold text-primary">~150K</span>
             </div>
           </div>
         </div>
       </div>
 
       {/* Activity Log */}
       <div className="rounded-xl border bg-card p-5">
         <h3 className="font-medium mb-4 flex items-center gap-2">
           <Video className="h-4 w-4" />
           Recent Activity
         </h3>
         <div className="space-y-3">
           {[
             { time: "2 min ago", action: "Comment posted", video: "10 AI Tools for 2024", platform: "YouTube" },
             { time: "5 min ago", action: "Video discovered", video: "Best SaaS Marketing Tips", platform: "YouTube" },
             { time: "8 min ago", action: "Comment approved", video: "Startup Growth Hacks", platform: "TikTok" },
             { time: "12 min ago", action: "3 comments generated", video: "AI Writing Tutorial", platform: "YouTube" },
           ].map((activity, i) => (
             <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
               <div className="flex items-center gap-3">
                 <span className="text-xs text-muted-foreground w-16">{activity.time}</span>
                 <span className="font-medium">{activity.action}</span>
               </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                 <span className="truncate max-w-[200px]">{activity.video}</span>
                 <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{activity.platform}</span>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 };