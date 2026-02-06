import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Video,
  MessageSquare,
  Send,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Bot,
  Activity,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";

interface ActivityItem {
  id: string;
  type: "discovery" | "generation" | "posting" | "boost" | "monitoring";
  message: string;
  details?: string;
  platform?: "youtube" | "tiktok";
  brand?: string;
  timestamp: string;
  status: "success" | "pending" | "processing";
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "discovery",
    message: "Discovered new trending video",
    details: "\"The Future of AI in 2025\" by Tech Explained",
    platform: "youtube",
    brand: "Olovka AI",
    timestamp: "Just now",
    status: "success",
  },
  {
    id: "2",
    type: "generation",
    message: "Generated 3 comment variants",
    details: "Analyzing best fit for video context",
    brand: "Wisebits",
    timestamp: "2 min ago",
    status: "processing",
  },
  {
    id: "3",
    type: "posting",
    message: "Posted comment successfully",
    details: "Comment placed at position #2",
    platform: "tiktok",
    brand: "Teract",
    timestamp: "5 min ago",
    status: "success",
  },
  {
    id: "4",
    type: "boost",
    message: "Auto-boosting underperforming comment",
    details: "Replacing with higher-engagement variant",
    platform: "youtube",
    brand: "Olovka AI",
    timestamp: "8 min ago",
    status: "processing",
  },
  {
    id: "5",
    type: "monitoring",
    message: "Position check complete",
    details: "4 comments in top 3 positions",
    timestamp: "10 min ago",
    status: "success",
  },
  {
    id: "6",
    type: "discovery",
    message: "Scanning for viral potential",
    details: "Analyzing 234 videos in queue",
    timestamp: "12 min ago",
    status: "pending",
  },
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "discovery": return Sparkles;
    case "generation": return MessageSquare;
    case "posting": return Send;
    case "boost": return Zap;
    case "monitoring": return Eye;
  }
};

const getActivityColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "discovery": return "text-primary";
    case "generation": return "text-accent";
    case "posting": return "text-accent";
    case "boost": return "text-primary";
    case "monitoring": return "text-muted-foreground";
  }
};

const getStatusIndicator = (status: ActivityItem["status"]) => {
  switch (status) {
    case "success": return <CheckCircle className="h-3 w-3 text-accent" />;
    case "processing": return <RefreshCw className="h-3 w-3 text-primary animate-spin" />;
    case "pending": return <Clock className="h-3 w-3 text-muted-foreground" />;
  }
};

interface AIAgentActivityFeedProps {
  compact?: boolean;
  maxItems?: number;
}

const AIAgentActivityFeed = ({ compact = false, maxItems = 10 }: AIAgentActivityFeedProps) => {
  const [activities, setActivities] = useState(mockActivities);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ["discovery", "generation", "posting", "monitoring"][Math.floor(Math.random() * 4)] as ActivityItem["type"],
        message: [
          "Discovered new trending video",
          "Generated comment variants",
          "Posted comment successfully",
          "Position check complete",
        ][Math.floor(Math.random() * 4)],
        platform: Math.random() > 0.5 ? "youtube" : "tiktok",
        brand: ["Olovka AI", "Wisebits", "Teract"][Math.floor(Math.random() * 3)],
        timestamp: "Just now",
        status: "success",
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, maxItems - 1)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [isLive, maxItems]);

  const displayActivities = activities.slice(0, maxItems);

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">AI Agent Activity</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isLive ? "bg-accent animate-pulse" : "bg-muted"}`} />
            <span className="text-xs text-muted-foreground">{isLive ? "Live" : "Paused"}</span>
          </div>
        </div>
        <div className="space-y-3">
          {displayActivities.slice(0, 5).map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`mt-0.5 ${getActivityColor(activity.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                {getStatusIndicator(activity.status)}
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Agent Activity</h3>
            <p className="text-sm text-muted-foreground">Real-time automation status</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isLive ? "bg-accent animate-pulse" : "bg-muted"}`} />
            <span className="text-sm text-muted-foreground">{isLive ? "Live" : "Paused"}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsLive(!isLive)}
            data-testid="button-toggle-live"
          >
            {isLive ? <Activity className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-4">
          {displayActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex gap-4">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">{activity.message}</p>
                      {activity.details && (
                        <p className="text-sm text-muted-foreground mt-0.5">{activity.details}</p>
                      )}
                    </div>
                    {getStatusIndicator(activity.status)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {activity.platform === "youtube" && (
                      <Badge variant="outline" className="text-red-500 border-red-500/30 text-xs">
                        <SiYoutube className="mr-1 h-3 w-3" />
                        YouTube
                      </Badge>
                    )}
                    {activity.platform === "tiktok" && (
                      <Badge variant="outline" className="border-foreground/30 text-xs">
                        <SiTiktok className="mr-1 h-3 w-3" />
                        TikTok
                      </Badge>
                    )}
                    {activity.brand && (
                      <Badge variant="secondary" className="text-xs">{activity.brand}</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default AIAgentActivityFeed;
