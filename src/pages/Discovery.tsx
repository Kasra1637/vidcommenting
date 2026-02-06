import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { GlassCard, BentoGrid, BentoCard } from "@/components/ui/glass-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GlowInput } from "@/components/ui/glow-input";
import { DataValue, ViralScore, Timestamp } from "@/components/ui/data-display";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  TrendingUp,
  Flame,
  Eye,
  Clock,
  Search,
  Filter,
  Play,
  Plus,
  Zap,
  RefreshCw,
  Check,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";

interface TrendingVideo {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  platform: "youtube" | "tiktok";
  views: string;
  publishedAgo: string;
  growthRate: number;
  viralScore: number;
  engagementRate: number;
  trendingSignals: string[];
  predictedPeak: string;
  relevanceScore: number;
}

const mockTrendingVideos: TrendingVideo[] = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
    title: "The Future of AI in 2025 - Everything You Need to Know",
    channel: "Tech Explained",
    platform: "youtube",
    views: "127K",
    publishedAgo: "4 hours ago",
    growthRate: 342,
    viralScore: 94,
    engagementRate: 8.7,
    trendingSignals: ["Rapid growth", "High engagement", "Trending topic"],
    predictedPeak: "2-4 hours",
    relevanceScore: 96,
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    title: "I Built a SaaS in 24 Hours Using AI Tools",
    channel: "Indie Hacker",
    platform: "youtube",
    views: "89K",
    publishedAgo: "6 hours ago",
    growthRate: 278,
    viralScore: 87,
    engagementRate: 7.2,
    trendingSignals: ["Creator momentum", "Niche trending"],
    predictedPeak: "4-8 hours",
    relevanceScore: 92,
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
    title: "This productivity app changed my life",
    channel: "Daily Productivity",
    platform: "tiktok",
    views: "456K",
    publishedAgo: "2 hours ago",
    growthRate: 892,
    viralScore: 98,
    engagementRate: 12.4,
    trendingSignals: ["Viral velocity", "High shares", "Sound trending"],
    predictedPeak: "1-2 hours",
    relevanceScore: 88,
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    title: "How I Grew My Startup to $1M ARR",
    channel: "Startup Stories",
    platform: "youtube",
    views: "45K",
    publishedAgo: "8 hours ago",
    growthRate: 156,
    viralScore: 72,
    engagementRate: 6.1,
    trendingSignals: ["Steady growth", "High retention"],
    predictedPeak: "12-24 hours",
    relevanceScore: 94,
  },
  {
    id: "5",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop",
    title: "The AI tool nobody is talking about",
    channel: "AI Insider",
    platform: "tiktok",
    views: "234K",
    publishedAgo: "3 hours ago",
    growthRate: 567,
    viralScore: 91,
    engagementRate: 9.8,
    trendingSignals: ["Discovery phase", "Comment surge"],
    predictedPeak: "2-4 hours",
    relevanceScore: 97,
  },
];

const Discovery = () => {
  const [platform, setPlatform] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const toggleVideoSelection = (id: string) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const filteredVideos = mockTrendingVideos.filter((video) => {
    if (platform !== "all" && video.platform !== platform) return false;
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <motion.h1
              className="text-4xl font-bold text-gradient-purple"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              AI Discovery
            </motion.h1>
            <p className="mt-2 text-muted-foreground">
              Find trending videos before they go viral
            </p>
          </div>
          <div className="flex gap-3">
            <ShimmerButton variant="secondary" size="sm" onClick={handleScan}>
              <RefreshCw className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
              {isScanning ? "Scanning..." : "Scan Now"}
            </ShimmerButton>
            {selectedVideos.length > 0 && (
              <ShimmerButton size="sm">
                <Plus className="h-4 w-4" />
                Add {selectedVideos.length} Videos
              </ShimmerButton>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <BentoGrid className="mb-8">
          <BentoCard size="sm" glow="purple" className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Discovered
                </p>
                <span className="font-mono text-2xl font-bold text-foreground">1,234</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard size="sm" glow="cyan" className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <Flame className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Viral Potential
                </p>
                <span className="font-mono text-2xl font-bold text-secondary">47</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard size="sm" className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Avg Growth
                </p>
                <span className="font-mono text-2xl font-bold text-primary">+287%</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard size="sm" className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <Eye className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total Reach
                </p>
                <span className="font-mono text-2xl font-bold text-foreground">12.4M</span>
              </div>
            </div>
          </BentoCard>
        </BentoGrid>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-md">
            <GlowInput
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex gap-3">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-[160px] glass-card border-0">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Scanning Animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <GlassCard className="p-6" glow="purple">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 ai-glow">
                    <Sparkles className="h-7 w-7 text-primary animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      Scanning for trending videos...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Analyzing engagement patterns and growth trajectories
                    </p>
                    <div className="mt-3 relative">
                      <Progress value={65} className="h-2" />
                      <motion.div
                        className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Grid */}
        <div className="space-y-4">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard
                className={`overflow-hidden p-0 ${
                  selectedVideos.includes(video.id) ? "ring-2 ring-primary ai-glow-subtle" : ""
                }`}
                hover={true}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail */}
                  <div className="relative lg:w-72 flex-shrink-0 group">
                    <div className="aspect-video lg:aspect-auto lg:h-full bg-muted overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="viral-overlay" />
                    <div className="absolute top-3 left-3">
                      {video.platform === "youtube" ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/80 backdrop-blur-md">
                          <SiYoutube className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 backdrop-blur-md">
                          <SiTiktok className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <Play className="h-7 w-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{video.channel}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span className="font-mono">{video.views}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="font-mono">{video.publishedAgo}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-secondary">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-mono">+{video.growthRate}%</span>
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {video.trendingSignals.map((signal, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary border-0"
                            >
                              <Zap className="mr-1 h-3 w-3" />
                              {signal}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <ViralScore score={video.viralScore} size="md" />
                        <Button
                          variant={selectedVideos.includes(video.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleVideoSelection(video.id)}
                          className={
                            selectedVideos.includes(video.id)
                              ? "shimmer-button border-0"
                              : "glass-card border-0"
                          }
                        >
                          {selectedVideos.includes(video.id) ? (
                            <>
                              <Check className="mr-1 h-4 w-4" />
                              Selected
                            </>
                          ) : (
                            <>
                              <Plus className="mr-1 h-4 w-4" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border/30 pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Engagement
                        </p>
                        <p className="font-mono text-lg font-semibold text-foreground">
                          {video.engagementRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Peak Time
                        </p>
                        <p className="font-mono text-lg font-semibold text-secondary">
                          {video.predictedPeak}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Relevance
                        </p>
                        <div className="flex items-center gap-2">
                          <Progress value={video.relevanceScore} className="h-2 flex-1" />
                          <span className="font-mono text-sm font-medium text-primary">
                            {video.relevanceScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Discovery;