import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { GlassCard, BentoGrid, BentoCard } from "@/components/ui/glass-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DataValue, ViralScore, Timestamp } from "@/components/ui/data-display";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Plus,
  TrendingUp,
  Eye,
  MessageSquare,
  Zap,
  Play,
  Activity,
  Bot,
  Clock,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";
import { Link } from "wouter";

// Mock data
const stats = {
  totalReach: "2.4M",
  reachChange: "+23%",
  activeVideos: "87",
  videosChange: "+12",
  postedComments: "234",
  commentsChange: "+45",
  engagement: "8.7%",
  engagementChange: "+2.1%",
};

const trendingVideos = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
    title: "The Future of AI in 2025",
    channel: "Tech Explained",
    platform: "youtube" as const,
    views: "127K",
    viralScore: 94,
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    title: "I Built a SaaS in 24 Hours",
    channel: "Indie Hacker",
    platform: "youtube" as const,
    views: "89K",
    viralScore: 87,
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
    title: "This productivity app changed my life",
    channel: "Daily Productivity",
    platform: "tiktok" as const,
    views: "456K",
    viralScore: 98,
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    title: "How I Grew My Startup",
    channel: "Startup Stories",
    platform: "youtube" as const,
    views: "45K",
    viralScore: 72,
  },
];

const aiActivity = [
  { id: 1, type: "discovery", message: "Found 12 trending videos in AI niche", time: "2m ago" },
  { id: 2, type: "generation", message: "Generated 4 comments for Tech Insider video", time: "5m ago" },
  { id: 3, type: "posting", message: "Posted comment on 'Future of AI' - Position #3", time: "8m ago" },
  { id: 4, type: "boost", message: "Boosted comment to Position #1 on trending video", time: "12m ago" },
  { id: 5, type: "approval", message: "Auto-approved 8 high-quality comments", time: "15m ago" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <motion.h1
              className="text-4xl font-bold text-gradient-mixed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Command Center
            </motion.h1>
            <p className="mt-2 text-muted-foreground">
              AI-powered viral video discovery & engagement
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/discovery">
              <ShimmerButton variant="secondary" size="sm">
                <Sparkles className="h-4 w-4" />
                AI Discovery
              </ShimmerButton>
            </Link>
            <Link href="/brands/new">
              <ShimmerButton size="sm">
                <Plus className="h-4 w-4" />
                New Brand
              </ShimmerButton>
            </Link>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <BentoGrid className="mb-8">
          {/* Live Metrics - Small tiles */}
          <BentoCard size="sm" glow="none" className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <Eye className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Total Reach
              </span>
            </div>
            <DataValue value={stats.totalReach} change={stats.reachChange} changeType="positive" size="lg" />
          </BentoCard>

          <BentoCard size="sm" glow="none" className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Engagement
              </span>
            </div>
            <DataValue value={stats.engagement} change={stats.engagementChange} changeType="positive" size="lg" />
          </BentoCard>

          <BentoCard size="sm" glow="none" className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Play className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Active Videos
              </span>
            </div>
            <DataValue value={stats.activeVideos} change={stats.videosChange} changeType="positive" size="lg" />
          </BentoCard>

          <BentoCard size="sm" glow="none" className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <MessageSquare className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Comments
              </span>
            </div>
            <DataValue value={stats.postedComments} change={stats.commentsChange} changeType="positive" size="lg" />
          </BentoCard>

          {/* Discovery Grid - Large section */}
          <BentoCard size="xl" glow="none" hover={false} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 ai-glow-subtle">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Trending Discovery</h3>
                  <p className="text-xs text-muted-foreground">Videos with viral potential</p>
                </div>
              </div>
              <Link href="/discovery">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {trendingVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Glass Overlay */}
                  <div className="viral-overlay" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3">
                    <div className="absolute top-2 left-2">
                      {video.platform === "youtube" ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/80 backdrop-blur-sm">
                          <SiYoutube className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm">
                          <SiTiktok className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <ViralScore score={video.viralScore} size="sm" showLabel={false} />
                    </div>
                    <p className="text-xs font-medium text-white line-clamp-2">{video.title}</p>
                    <span className="text-[10px] text-white/70 font-mono">{video.views} views</span>
                  </div>
                  {/* Hover Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* AI Agent Activity Feed */}
          <BentoCard size="md" glow="none" hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/20 animate-pulse">
                <Bot className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Agent Activity</h3>
                <p className="text-xs text-muted-foreground">Real-time automation log</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {aiActivity.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:translate-x-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div
                    className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === "discovery"
                        ? "bg-primary"
                        : activity.type === "posting"
                        ? "bg-secondary"
                        : activity.type === "boost"
                        ? "bg-secondary animate-pulse"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground/90 line-clamp-1">{activity.message}</p>
                    <Timestamp time={activity.time} />
                  </div>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* AI Command Center */}
          <BentoCard size="lg" glow="none" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 ai-glow">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Command Center</h3>
                <p className="text-xs text-muted-foreground">Autonomous comment generation</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Status Indicators */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-border bg-card p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs text-muted-foreground">Discovery</span>
                  </div>
                  <span className="font-mono text-lg text-secondary">Active</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-muted-foreground">Generation</span>
                  </div>
                  <span className="font-mono text-lg text-primary">Running</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-xs text-muted-foreground">Posting</span>
                  </div>
                  <span className="font-mono text-lg text-secondary">Queued</span>
                </div>
              </div>

              <div className="text-center py-4">
                <motion.div
                  className="inline-flex items-center gap-2 text-primary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bot className="h-5 w-5" />
                  <span className="font-mono text-sm">AI is working for Olovka AI</span>
                </motion.div>
              </div>

              <Link href="/brands">
                <ShimmerButton className="w-full">
                  <Sparkles className="h-4 w-4" />
                  Configure Automation
                </ShimmerButton>
              </Link>
            </div>
          </BentoCard>

          {/* Quick Stats Row */}
          <BentoCard size="lg" className="p-6" glow="none">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Performance Overview</h3>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <span className="font-mono text-3xl font-bold text-gradient-cyan">47</span>
                <p className="text-xs text-muted-foreground mt-1">Videos Found</p>
              </div>
              <div className="text-center">
                <span className="font-mono text-3xl font-bold text-gradient-purple">156</span>
                <p className="text-xs text-muted-foreground mt-1">Comments Posted</p>
              </div>
              <div className="text-center">
                <span className="font-mono text-3xl font-bold text-foreground">23</span>
                <p className="text-xs text-muted-foreground mt-1">Top 3 Positions</p>
              </div>
              <div className="text-center">
                <span className="font-mono text-3xl font-bold text-gradient-cyan">892K</span>
                <p className="text-xs text-muted-foreground mt-1">Impressions</p>
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </AppLayout>
  );
};

export default Dashboard;