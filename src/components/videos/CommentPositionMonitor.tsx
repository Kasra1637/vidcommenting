import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  TrendingDown,
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";

interface CommentPosition {
  id: string;
  text: string;
  currentPosition: number;
  previousPosition: number;
  peakPosition: number;
  status: "top" | "stable" | "declining" | "lost" | "boosting";
  reach: number;
  likes: number;
  replies: number;
  lastChecked: string;
  autoBoostEnabled: boolean;
}

interface CommentPositionMonitorProps {
  videoId: string;
}

const mockComments: CommentPosition[] = [
  {
    id: "1",
    text: "This is exactly what I needed for my workflow! The AI integration is seamless and saves me hours every week.",
    currentPosition: 1,
    previousPosition: 1,
    peakPosition: 1,
    status: "top",
    reach: 45000,
    likes: 234,
    replies: 18,
    lastChecked: "2 min ago",
    autoBoostEnabled: true,
  },
  {
    id: "2",
    text: "Game changer for productivity. Been using this for a month and my output has doubled.",
    currentPosition: 3,
    previousPosition: 2,
    peakPosition: 2,
    status: "declining",
    reach: 28000,
    likes: 156,
    replies: 12,
    lastChecked: "2 min ago",
    autoBoostEnabled: true,
  },
  {
    id: "3",
    text: "Finally a tool that actually delivers on its promises. Highly recommend!",
    currentPosition: 7,
    previousPosition: 5,
    peakPosition: 3,
    status: "declining",
    reach: 12000,
    likes: 89,
    replies: 6,
    lastChecked: "2 min ago",
    autoBoostEnabled: false,
  },
  {
    id: "4",
    text: "The automation features are incredible. Set it up once and forget it.",
    currentPosition: 4,
    previousPosition: 6,
    peakPosition: 4,
    status: "stable",
    reach: 18000,
    likes: 112,
    replies: 8,
    lastChecked: "2 min ago",
    autoBoostEnabled: true,
  },
];

const getPositionChange = (current: number, previous: number) => {
  if (current < previous) return { icon: ArrowUp, color: "text-accent", label: `+${previous - current}` };
  if (current > previous) return { icon: ArrowDown, color: "text-destructive", label: `-${current - previous}` };
  return { icon: Minus, color: "text-muted-foreground", label: "0" };
};

const getStatusBadge = (status: CommentPosition["status"]) => {
  switch (status) {
    case "top":
      return <Badge className="bg-accent/10 text-accent border-accent/20"><CheckCircle className="mr-1 h-3 w-3" />Top Position</Badge>;
    case "stable":
      return <Badge variant="secondary"><Minus className="mr-1 h-3 w-3" />Stable</Badge>;
    case "declining":
      return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20"><TrendingDown className="mr-1 h-3 w-3" />Declining</Badge>;
    case "lost":
      return <Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" />Lost</Badge>;
    case "boosting":
      return <Badge className="bg-primary/10 text-primary border-primary/20"><Zap className="mr-1 h-3 w-3" />Boosting</Badge>;
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const CommentPositionMonitor = ({ videoId }: CommentPositionMonitorProps) => {
  const [comments, setComments] = useState(mockComments);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [globalAutoBoost, setGlobalAutoBoost] = useState(true);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleBoost = (commentId: string) => {
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, status: "boosting" as const } : c
    ));
  };

  const toggleAutoBoost = (commentId: string) => {
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, autoBoostEnabled: !c.autoBoostEnabled } : c
    ));
  };

  const topComments = comments.filter(c => c.currentPosition <= 3).length;
  const decliningComments = comments.filter(c => c.status === "declining").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Comment Position Monitor</h3>
          <p className="text-sm text-muted-foreground">
            Track and maintain visibility of your comments
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Auto-Boost All</span>
            <Switch
              checked={globalAutoBoost}
              onCheckedChange={setGlobalAutoBoost}
              data-testid="switch-global-auto-boost"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            data-testid="button-refresh-positions"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top 3 Positions</p>
              <p className="text-2xl font-bold text-foreground">{topComments}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <TrendingDown className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Need Attention</p>
              <p className="text-2xl font-bold text-foreground">{decliningComments}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Checked</p>
              <p className="text-2xl font-bold text-foreground">2m ago</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => {
          const positionChange = getPositionChange(comment.currentPosition, comment.previousPosition);
          const ChangeIcon = positionChange.icon;
          
          return (
            <Card key={comment.id} className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-xl font-bold">
                      #{comment.currentPosition}
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${positionChange.color}`}>
                      <ChangeIcon className="h-3 w-3" />
                      {positionChange.label}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(comment.status)}
                      <span className="text-xs text-muted-foreground">
                        Peak: #{comment.peakPosition}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{comment.text}</p>
                    
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {formatNumber(comment.reach)} reach
                      </span>
                      <span>{comment.likes} likes</span>
                      <span>{comment.replies} replies</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {comment.lastChecked}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Auto-boost</span>
                    <Switch
                      checked={comment.autoBoostEnabled}
                      onCheckedChange={() => toggleAutoBoost(comment.id)}
                      disabled={!globalAutoBoost}
                      data-testid={`switch-auto-boost-${comment.id}`}
                    />
                  </div>
                  {comment.status === "declining" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleBoost(comment.id)}
                      data-testid={`button-boost-${comment.id}`}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Boost Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CommentPositionMonitor;
