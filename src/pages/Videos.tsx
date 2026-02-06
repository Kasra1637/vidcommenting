import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { VideoCard } from "@/components/videos/VideoCard";
import {
  Plus,
  Search,
  Filter,
  Sparkles,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

type VideoStatus =
  | "performing"
  | "stagnated"
  | "needs-boost"
  | "boosting"
  | "inactive"
  | "pending"
  | "awaiting";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  platform: "youtube" | "tiktok";
  views: string;
  status: VideoStatus;
  reach: number;
  position: number;
  brand: string;
}

const videosData: Video[] = [
  {
    id: "1",
    thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "10 AI Tools That Will Change Your Life in 2024",
    channel: "Tech Insider",
    platform: "youtube",
    views: "1.2M",
    status: "performing",
    reach: 125000,
    position: 1,
    brand: "Olovka AI",
  },
  {
    id: "2",
    thumbnail: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "How to Build a Startup in 30 Days",
    channel: "Startup Grind",
    platform: "youtube",
    views: "456K",
    status: "needs-boost",
    reach: 45000,
    position: 7,
    brand: "Wisebits",
  },
  {
    id: "3",
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "The Future of Content Creation with AI",
    channel: "Creator Lab",
    platform: "tiktok",
    views: "892K",
    status: "stagnated",
    reach: 78000,
    position: 15,
    brand: "Olovka AI",
  },
  {
    id: "4",
    thumbnail: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Marketing Strategies for 2024",
    channel: "Marketing Pro",
    platform: "tiktok",
    views: "234K",
    status: "awaiting",
    reach: 0,
    position: 0,
    brand: "Teract",
  },
  {
    id: "5",
    thumbnail: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Best Productivity Apps You Need",
    channel: "App Reviews",
    platform: "youtube",
    views: "567K",
    status: "boosting",
    reach: 32000,
    position: 5,
    brand: "Wisebits",
  },
  {
    id: "6",
    thumbnail: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Remote Work Setup Guide 2024",
    channel: "Work From Home",
    platform: "youtube",
    views: "789K",
    status: "performing",
    reach: 98000,
    position: 3,
    brand: "Olovka AI",
  },
];

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const { toast } = useToast();

  const filteredVideos = videosData.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || video.status === statusFilter;
    const matchesBrand = brandFilter === "all" || video.brand === brandFilter;
    return matchesSearch && matchesStatus && matchesBrand;
  });

  const handleAddVideo = () => {
    toast({
      title: "Video added!",
      description: "AI agents are analyzing the video and generating comments.",
    });
    setShowAddDialog(false);
    setVideoUrl("");
  };

  const handleAIDiscovery = () => {
    toast({
      title: "AI Discovery started!",
      description: "AI agents are searching for relevant videos...",
    });
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Videos</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your videos and comment sequences
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleAIDiscovery}>
                <Sparkles className="mr-2 h-4 w-4" />
                AI Discovery
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Video
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Video</DialogTitle>
                    <DialogDescription>
                      Paste a YouTube or TikTok video URL to add it to your
                      campaign
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="videoUrl">Video URL</Label>
                      <Input
                        id="videoUrl"
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Select Brand</Label>
                      <Select defaultValue="olovka">
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="olovka">Olovka AI</SelectItem>
                          <SelectItem value="wisebits">Wisebits</SelectItem>
                          <SelectItem value="teract">Teract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddVideo} className="w-full">
                      Add Video
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="performing">Performing</SelectItem>
                  <SelectItem value="stagnated">Stagnated</SelectItem>
                  <SelectItem value="needs-boost">Needs Boost</SelectItem>
                  <SelectItem value="boosting">Boosting</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="awaiting">Awaiting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="Olovka AI">Olovka AI</SelectItem>
                  <SelectItem value="Wisebits">Wisebits</SelectItem>
                  <SelectItem value="Teract">Teract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={cn(
                "h-8 px-3",
                viewMode === "grid" && "bg-background shadow-sm"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={cn(
                "h-8 px-3",
                viewMode === "list" && "bg-background shadow-sm"
              )}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <p className="text-muted-foreground">No videos found matching your filters.</p>
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <VideoCard key={video.id} {...video} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard {...video} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {filteredVideos.length} of {videosData.length} videos</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Videos;
