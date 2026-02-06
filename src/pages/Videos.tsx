import { useState } from "react";
import { Link } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Eye,
  Zap,
  Trash2,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";
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

const statusLabels: Record<VideoStatus, string> = {
  performing: "Performing Well",
  stagnated: "Stagnated",
  "needs-boost": "Needs Boost",
  boosting: "Boosting",
  inactive: "Inactive",
  pending: "Pending Posting",
  awaiting: "Awaiting Approval",
};

const statusStyles: Record<VideoStatus, string> = {
  performing: "status-performing",
  stagnated: "status-stagnated",
  "needs-boost": "status-needs-boost",
  boosting: "status-boosting",
  inactive: "status-inactive",
  pending: "status-pending",
  awaiting: "status-awaiting",
};

const videosData: Video[] = [
  {
    id: "1",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
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
    thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
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
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
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
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
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
    thumbnail: "https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg",
    title: "Best Productivity Apps You Need",
    channel: "App Reviews",
    platform: "youtube",
    views: "567K",
    status: "boosting",
    reach: 32000,
    position: 5,
    brand: "Wisebits",
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
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
        {/* Header */}
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

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
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

        {/* Videos Table */}
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Video</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Position</TableHead>
                <TableHead className="text-right">Reach</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <Link
                      to={`/videos/${video.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <PlayCircle className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                          {video.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {video.channel} • {video.views} views
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {video.platform === "youtube" ? (
                      <Badge className="bg-red-500 text-white">
                        <SiYoutube className="mr-1 h-3 w-3" />
                        YouTube
                      </Badge>
                    ) : (
                      <Badge className="bg-black text-white dark:bg-white dark:text-black">
                        <SiTiktok className="mr-1 h-3 w-3" />
                        TikTok
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{video.brand}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`status-badge ${statusStyles[video.status]}`}>
                      {statusLabels[video.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {video.position > 0 ? (
                      <span className="font-medium">#{video.position}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">
                      {video.reach > 0 ? formatNumber(video.reach) : "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open on YouTube
                        </DropdownMenuItem>
                        {video.status === "needs-boost" && (
                          <DropdownMenuItem>
                            <Zap className="mr-2 h-4 w-4" />
                            Boost Comment
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Videos;
