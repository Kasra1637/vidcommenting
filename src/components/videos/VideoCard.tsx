import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlayCircle,
  MoreVertical,
  Eye,
  ExternalLink,
  Zap,
  Trash2,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";
import { cn } from "@/lib/utils";

type VideoStatus =
  | "performing"
  | "stagnated"
  | "needs-boost"
  | "boosting"
  | "inactive"
  | "pending"
  | "awaiting";

interface VideoCardProps {
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
  index?: number;
}

const statusConfig: Record<VideoStatus, { label: string; color: string; bgColor: string }> = {
  performing: { label: "Performing", color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
  stagnated: { label: "Stagnated", color: "text-amber-400", bgColor: "bg-amber-500/20" },
  "needs-boost": { label: "Needs Boost", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  boosting: { label: "Boosting", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  inactive: { label: "Inactive", color: "text-gray-400", bgColor: "bg-gray-500/20" },
  pending: { label: "Pending", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  awaiting: { label: "Awaiting", color: "text-violet-400", bgColor: "bg-violet-500/20" },
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const VideoCard = ({
  id,
  thumbnail,
  title,
  channel,
  platform,
  views,
  status,
  reach,
  position,
  brand,
  index = 0,
}: VideoCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card group overflow-hidden"
    >
      <Link href={`/videos/${id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

          <div className="absolute left-3 top-3">
            {platform === "youtube" ? (
              <Badge className="bg-red-600/90 text-white backdrop-blur-sm border-0">
                <SiYoutube className="mr-1.5 h-3 w-3" />
                YouTube
              </Badge>
            ) : (
              <Badge className="bg-black/80 text-white backdrop-blur-sm border-0">
                <SiTiktok className="mr-1.5 h-3 w-3" />
                TikTok
              </Badge>
            )}
          </div>

          <div className="absolute right-3 top-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open on {platform === "youtube" ? "YouTube" : "TikTok"}
                </DropdownMenuItem>
                {status === "needs-boost" && (
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
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <motion.div
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
            >
              <PlayCircle className="h-10 w-10 text-white" />
            </motion.div>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
              statusInfo.bgColor,
              statusInfo.color
            )}>
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {statusInfo.label}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/videos/${id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-secondary transition-colors mb-2">
            {title}
          </h3>
        </Link>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span className="truncate">{channel}</span>
          <span>{views} views</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="px-2 py-0.5 rounded-full bg-muted/50">{brand}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
              <MessageSquare className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Position</p>
              <p className="font-semibold text-foreground">
                {position > 0 ? `#${position}` : "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Reach</p>
              <p className="font-semibold text-foreground">
                {reach > 0 ? formatNumber(reach) : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
