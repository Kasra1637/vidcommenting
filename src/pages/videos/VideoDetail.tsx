import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentGenerator } from "@/components/videos/CommentGenerator";
import CommentPositionMonitor from "@/components/videos/CommentPositionMonitor";
import {
  ArrowLeft,
  ExternalLink,
  Zap,
  RefreshCw,
  Check,
  X,
  Edit2,
  Trash2,
  PlayCircle,
  TrendingUp,
  Eye,
  Clock,
  MessageSquare,
  Activity,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  text: string;
  status: "draft" | "approved" | "posted" | "failed" | "lost";
  reach?: number;
  position?: number;
  postedAt?: string;
}

const mockVideo = {
  id: "1",
  thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  title: "10 AI Tools That Will Change Your Life in 2024",
  channel: "Tech Insider",
  platform: "youtube" as const,
  views: "1.2M",
  status: "performing" as const,
  reach: 125000,
  position: 1,
  brand: "Olovka AI",
  url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
};

const mockComments: Comment[] = [
  {
    id: "1",
    text: "I've been using Olovka AI for my content and it's been a game-changer! The AI writing is incredibly natural and saves me hours every week. Highly recommend checking it out if you're into content creation.",
    status: "posted",
    reach: 125000,
    position: 1,
    postedAt: "2024-01-15",
  },
  {
    id: "2",
    text: "Great video! Speaking of AI tools, I recently discovered Olovka AI and it's perfect for writers who want to boost their productivity. The quality is impressive!",
    status: "approved",
  },
  {
    id: "3",
    text: "This is exactly what I was looking for! As someone who uses AI for writing daily, I'd also add Olovka AI to this list - it's specifically designed for content creators.",
    status: "draft",
  },
  {
    id: "4",
    text: "Love these recommendations! For anyone looking for AI writing assistance, Olovka AI has been my go-to lately. The output quality is really impressive.",
    status: "draft",
  },
];

const VideoDetail = () => {
  const [, params] = useRoute<{ id: string }>("/videos/:id");
  const id = params?.id ?? "";
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [comments, setComments] = useState(mockComments);
  const [autoPosting, setAutoPosting] = useState(true);
  const [autoBoosting, setAutoBoosting] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleCommentApproved = (comment: { text: string; tone: string }) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text: comment.text,
      status: "draft",
    };
    setComments([...comments, newComment]);
  };

  const handleApprove = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, status: "approved" as const } : c
      )
    );
    toast({
      title: "Comment approved!",
      description: "The comment has been added to the posting queue.",
    });
  };

  const handleRegenerate = (commentId: string) => {
    toast({
      title: "Regenerating comment...",
      description: "AI is generating a new comment.",
    });
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (commentId: string) => {
    setComments(
      comments.map((c) => (c.id === commentId ? { ...c, text: editText } : c))
    );
    setEditingId(null);
    toast({
      title: "Comment updated!",
      description: "Your changes have been saved.",
    });
  };

  const handleBoost = () => {
    toast({
      title: "Boosting comment...",
      description: "Strategic likes are being added to improve position.",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const draftComments = comments.filter((c) => c.status === "draft");
  const approvedComments = comments.filter((c) => c.status === "approved");
  const postedComments = comments.filter((c) => c.status === "posted");

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setLocation("/videos")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Button>
        </div>

        {/* Video Info */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border bg-card">
              <div className="relative aspect-video bg-muted">
                <img
                  src={mockVideo.thumbnail}
                  alt={mockVideo.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <h1 className="text-xl font-semibold text-foreground flex-1">
                    {mockVideo.title}
                  </h1>
                  {mockVideo.platform === "youtube" ? (
                    <Badge className="bg-red-500 text-white">
                      <SiYoutube className="mr-1 h-3 w-3" />
                      YouTube
                    </Badge>
                  ) : (
                    <Badge className="bg-black text-white">
                      <SiTiktok className="mr-1 h-3 w-3" />
                      TikTok
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {mockVideo.channel} • {mockVideo.views} views
                </p>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" asChild>
                    <a href={mockVideo.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open on YouTube
                    </a>
                  </Button>
                  <Button variant="outline" onClick={handleBoost}>
                    <Zap className="mr-2 h-4 w-4" />
                    Boost Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Comment Generator */}
          <div className="lg:col-span-2">
            <CommentGenerator
              videoTitle={mockVideo.title}
              videoChannel={mockVideo.channel}
              brandName={mockVideo.brand}
              onCommentApproved={handleCommentApproved}
            />
          </div>

          {/* Stats & Settings */}
          <div className="space-y-4">
            {/* Performance Stats */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-foreground">Performance</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Reach</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {formatNumber(mockVideo.reach)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Position</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    #{mockVideo.position}
                  </p>
                </div>
              </div>
            </div>

            {/* Automation Settings */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-foreground">Automation</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-posting" className="cursor-pointer">
                    Auto-posting
                  </Label>
                  <Switch
                    id="auto-posting"
                    checked={autoPosting}
                    onCheckedChange={setAutoPosting}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-boosting" className="cursor-pointer">
                    Auto-boosting
                  </Label>
                  <Switch
                    id="auto-boosting"
                    checked={autoBoosting}
                    onCheckedChange={setAutoBoosting}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section with Tabs */}
        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="manage" data-testid="tab-manage-comments">
              <MessageSquare className="mr-2 h-4 w-4" />
              Manage Comments
            </TabsTrigger>
            <TabsTrigger value="monitor" data-testid="tab-position-monitor">
              <Activity className="mr-2 h-4 w-4" />
              Position Monitor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitor">
            <CommentPositionMonitor videoId={mockVideo.id} />
          </TabsContent>

          <TabsContent value="manage">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Posted & Approved */}
              <div className="space-y-6">
                {/* Posted Comments */}
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Posted Comments</h3>
                  </div>
              {postedComments.length > 0 ? (
                <div className="space-y-4">
                  {postedComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-lg border bg-muted/30 p-4"
                    >
                      <p className="text-sm text-foreground">{comment.text}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {formatNumber(comment.reach || 0)} reach
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          #{comment.position}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {comment.postedAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No comments posted yet
                </p>
              )}
            </div>

            {/* Approved Queue */}
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-info" />
                <h3 className="font-semibold text-foreground">Posting Queue</h3>
              </div>
              {approvedComments.length > 0 ? (
                <div className="space-y-4">
                  {approvedComments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className="rounded-lg border bg-muted/30 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-info">
                          Next in queue: #{index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No comments in queue
                </p>
              )}
            </div>
          </div>

          {/* Draft Comments */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-warning" />
                <h3 className="font-semibold text-foreground">
                  Draft Comments ({draftComments.length})
                </h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRegenerate("")}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate All
              </Button>
            </div>
            {draftComments.length > 0 ? (
              <div className="space-y-4">
                {draftComments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border p-4">
                    {editingId === comment.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(comment.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-foreground">{comment.text}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(comment.id)}
                          >
                            <Check className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(comment)}
                          >
                            <Edit2 className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRegenerate(comment.id)}
                          >
                            <RefreshCw className="mr-1 h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No draft comments available
                </p>
                <Button className="mt-4" variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Comments
                </Button>
              </div>
            )}
          </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default VideoDetail;
