import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Play,
  Pause,
  Settings,
  Sparkles,
  Video,
  MessageSquare,
  TrendingUp,
  Clock,
  Target,
  Zap,
  BarChart3,
  Bot,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";

interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: "active" | "paused" | "completed" | "scheduled";
  platform: "youtube" | "tiktok" | "both";
  videosDiscovered: number;
  commentsPosted: number;
  commentsQueued: number;
  reach: string;
  automationLevel: "full" | "semi" | "manual";
  lastActivity: string;
  progress: number;
  aiAgentStatus: "discovering" | "generating" | "posting" | "monitoring" | "idle";
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Brand Awareness Push",
    brand: "Olovka AI",
    status: "active",
    platform: "both",
    videosDiscovered: 156,
    commentsPosted: 89,
    commentsQueued: 23,
    reach: "1.2M",
    automationLevel: "full",
    lastActivity: "2 minutes ago",
    progress: 67,
    aiAgentStatus: "monitoring",
  },
  {
    id: "2",
    name: "Product Launch Campaign",
    brand: "Wisebits",
    status: "active",
    platform: "youtube",
    videosDiscovered: 78,
    commentsPosted: 45,
    commentsQueued: 12,
    reach: "567K",
    automationLevel: "semi",
    lastActivity: "15 minutes ago",
    progress: 45,
    aiAgentStatus: "generating",
  },
  {
    id: "3",
    name: "TikTok Viral Strategy",
    brand: "Teract",
    status: "paused",
    platform: "tiktok",
    videosDiscovered: 234,
    commentsPosted: 178,
    commentsQueued: 0,
    reach: "890K",
    automationLevel: "full",
    lastActivity: "2 hours ago",
    progress: 100,
    aiAgentStatus: "idle",
  },
  {
    id: "4",
    name: "Influencer Collaboration",
    brand: "Olovka AI",
    status: "scheduled",
    platform: "youtube",
    videosDiscovered: 0,
    commentsPosted: 0,
    commentsQueued: 0,
    reach: "0",
    automationLevel: "full",
    lastActivity: "Starts in 2 days",
    progress: 0,
    aiAgentStatus: "idle",
  },
];

const getStatusColor = (status: Campaign["status"]) => {
  switch (status) {
    case "active": return "bg-accent/10 text-accent border-accent/20";
    case "paused": return "bg-muted text-muted-foreground border-muted";
    case "completed": return "bg-primary/10 text-primary border-primary/20";
    case "scheduled": return "bg-primary/10 text-primary border-primary/20";
  }
};

const getAgentStatusColor = (status: Campaign["aiAgentStatus"]) => {
  switch (status) {
    case "discovering": return "text-primary";
    case "generating": return "text-accent";
    case "posting": return "text-accent";
    case "monitoring": return "text-primary";
    case "idle": return "text-muted-foreground";
  }
};

const getAgentStatusIcon = (status: Campaign["aiAgentStatus"]) => {
  switch (status) {
    case "discovering": return Sparkles;
    case "generating": return MessageSquare;
    case "posting": return Zap;
    case "monitoring": return Activity;
    case "idle": return Clock;
  }
};

const Campaigns = () => {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCampaigns = mockCampaigns.filter(c => 
    statusFilter === "all" || c.status === statusFilter
  );

  const activeCampaigns = mockCampaigns.filter(c => c.status === "active").length;
  const totalReach = "2.7M";
  const totalComments = mockCampaigns.reduce((sum, c) => sum + c.commentsPosted, 0);

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your automated brand awareness campaigns
              </p>
            </div>
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
              <DialogTrigger asChild>
                <Button data-testid="button-new-campaign">
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Set up an automated campaign to discover videos and post comments 24/7.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input id="name" placeholder="e.g., Q2 Growth Campaign" data-testid="input-campaign-name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select>
                      <SelectTrigger data-testid="select-brand">
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="olovka">Olovka AI</SelectItem>
                        <SelectItem value="wisebits">Wisebits</SelectItem>
                        <SelectItem value="teract">Teract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Target Platforms</Label>
                    <Select>
                      <SelectTrigger data-testid="select-platform">
                        <SelectValue placeholder="Select platforms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">YouTube & TikTok</SelectItem>
                        <SelectItem value="youtube">YouTube Only</SelectItem>
                        <SelectItem value="tiktok">TikTok Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="keywords">Discovery Keywords</Label>
                    <Textarea 
                      id="keywords" 
                      placeholder="AI tools, productivity, SaaS, startup tips..." 
                      data-testid="input-keywords"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Full Automation</p>
                      <p className="text-sm text-muted-foreground">
                        AI will discover, generate, and post comments automatically
                      </p>
                    </div>
                    <Switch defaultChecked data-testid="switch-automation" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowNewDialog(false)} data-testid="button-create-campaign">
                    Create Campaign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card className="p-4" data-testid="stat-active-campaigns">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold text-foreground" data-testid="text-active-campaigns">{activeCampaigns}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4" data-testid="stat-videos-discovered">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Videos Discovered</p>
                <p className="text-2xl font-bold text-foreground" data-testid="text-videos-discovered">468</p>
              </div>
            </div>
          </Card>
          <Card className="p-4" data-testid="stat-comments-posted">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <MessageSquare className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comments Posted</p>
                <p className="text-2xl font-bold text-foreground" data-testid="text-comments-posted">{totalComments}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4" data-testid="stat-total-reach">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold text-foreground" data-testid="text-total-reach">{totalReach}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]" data-testid="select-status-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => {
            const AgentIcon = getAgentStatusIcon(campaign.aiAgentStatus);
            return (
              <Card key={campaign.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                      {campaign.platform === "youtube" && (
                        <Badge variant="outline" className="text-red-500 border-red-500/30">
                          <SiYoutube className="mr-1 h-3 w-3" />
                          YouTube
                        </Badge>
                      )}
                      {campaign.platform === "tiktok" && (
                        <Badge variant="outline" className="border-foreground/30">
                          <SiTiktok className="mr-1 h-3 w-3" />
                          TikTok
                        </Badge>
                      )}
                      {campaign.platform === "both" && (
                        <>
                          <Badge variant="outline" className="text-red-500 border-red-500/30">
                            <SiYoutube className="mr-1 h-3 w-3" />
                          </Badge>
                          <Badge variant="outline" className="border-foreground/30">
                            <SiTiktok className="mr-1 h-3 w-3" />
                          </Badge>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Brand: {campaign.brand} • {campaign.lastActivity}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <span><strong>{campaign.videosDiscovered}</strong> videos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span><strong>{campaign.commentsPosted}</strong> posted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span><strong>{campaign.commentsQueued}</strong> queued</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span><strong>{campaign.reach}</strong> reach</span>
                      </div>
                    </div>

                    {campaign.status === "active" && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Campaign Progress</span>
                          <span className="text-sm font-medium">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className={`flex items-center gap-2 ${getAgentStatusColor(campaign.aiAgentStatus)}`}>
                      <AgentIcon className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">
                        AI {campaign.aiAgentStatus}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {campaign.status === "active" ? (
                        <Button variant="outline" size="sm" data-testid={`button-pause-${campaign.id}`}>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </Button>
                      ) : campaign.status === "paused" ? (
                        <Button variant="outline" size="sm" data-testid={`button-resume-${campaign.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm" data-testid={`button-settings-${campaign.id}`}>
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`button-analytics-${campaign.id}`}>
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Campaigns;
