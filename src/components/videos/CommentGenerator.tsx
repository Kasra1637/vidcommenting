import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  RefreshCw,
  Check,
  X,
  Edit2,
  Bot,
  MessageSquare,
  Smile,
  Briefcase,
  Laugh,
  Zap,
  Award,
  Wand2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CommentGeneratorProps {
  videoTitle: string;
  videoChannel: string;
  brandName: string;
  brandDescription?: string;
  onCommentApproved: (comment: { text: string; tone: string }) => void;
}

type Tone = "formal" | "friendly" | "humorous" | "enthusiastic" | "professional";

interface GeneratedComment {
  text: string;
  tone: Tone;
  personality: string;
  authenticityScore: number;
}

type GenerationStage = 
  | "idle"
  | "analyzing"
  | "selecting-personality"
  | "generating"
  | "refining"
  | "complete";

const toneOptions: { value: Tone; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "formal", label: "Formal", icon: <Briefcase className="h-4 w-4" />, description: "Professional" },
  { value: "friendly", label: "Friendly", icon: <Smile className="h-4 w-4" />, description: "Approachable" },
  { value: "humorous", label: "Humorous", icon: <Laugh className="h-4 w-4" />, description: "Witty" },
  { value: "enthusiastic", label: "Enthusiastic", icon: <Zap className="h-4 w-4" />, description: "Energetic" },
  { value: "professional", label: "Professional", icon: <Award className="h-4 w-4" />, description: "Authoritative" },
];

const stageMessages: Record<GenerationStage, string> = {
  idle: "",
  analyzing: "Analyzing video content and context...",
  "selecting-personality": "Selecting authentic AI personality...",
  generating: "Crafting comment with chosen tone...",
  refining: "Refining for authenticity...",
  complete: "Comment generated successfully!",
};

const stageProgressMap: Record<GenerationStage, number> = {
  idle: 0,
  analyzing: 25,
  "selecting-personality": 50,
  generating: 75,
  refining: 90,
  complete: 100,
};

export const CommentGenerator = ({
  videoTitle,
  videoChannel,
  brandName,
  brandDescription,
  onCommentApproved,
}: CommentGeneratorProps) => {
  const { toast } = useToast();
  const [selectedTone, setSelectedTone] = useState<Tone>("friendly");
  const [stage, setStage] = useState<GenerationStage>("idle");
  const [generatedComment, setGeneratedComment] = useState<GeneratedComment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedComment(null);
    
    const stages: GenerationStage[] = ["analyzing", "selecting-personality", "generating", "refining"];
    
    for (const s of stages) {
      setStage(s);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            videoTitle,
            videoChannel,
            brandName,
            brandDescription,
            tone: selectedTone,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate comment");
      }

      const data = await response.json();
      
      setGeneratedComment({
        text: data.comment,
        tone: data.tone,
        personality: data.personality,
        authenticityScore: data.authenticityScore,
      });
      setStage("complete");
      
      toast({
        title: "Comment Generated!",
        description: `${data.tone.charAt(0).toUpperCase() + data.tone.slice(1)} tone applied with ${data.personality} personality.`,
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      setStage("idle");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setGeneratedComment(null);
    setStage("idle");
    handleGenerate();
  };

  const handleApprove = () => {
    if (generatedComment) {
      onCommentApproved({ text: generatedComment.text, tone: generatedComment.tone });
      toast({
        title: "Comment Approved!",
        description: "Added to draft comments for review.",
      });
      setGeneratedComment(null);
      setStage("idle");
    }
  };

  const handleReject = () => {
    setGeneratedComment(null);
    setStage("idle");
    toast({
      title: "Comment Rejected",
      description: "Try generating with a different tone.",
    });
  };

  const handleEdit = () => {
    if (generatedComment) {
      setEditText(generatedComment.text);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (generatedComment) {
      setGeneratedComment({ ...generatedComment, text: editText });
      setIsEditing(false);
      toast({
        title: "Comment Updated",
        description: "Your edits have been saved.",
      });
    }
  };

  return (
    <div className="glass-card p-6 ai-glow-subtle">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
          <Wand2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">AI Comment Generator</h3>
          <p className="text-sm text-muted-foreground">Generate authentic, engaging comments</p>
        </div>
      </div>

      {/* Tone Selection */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-medium text-foreground">Select Tone</Label>
        <RadioGroup
          value={selectedTone}
          onValueChange={(v) => setSelectedTone(v as Tone)}
          className="grid grid-cols-5 gap-2"
        >
          {toneOptions.map((tone) => (
            <Label
              key={tone.value}
              htmlFor={tone.value}
              className={`glass-card flex cursor-pointer flex-col items-center gap-1.5 p-3 transition-all ${
                selectedTone === tone.value
                  ? "ring-2 ring-primary ai-glow-subtle"
                  : ""
              }`}
            >
              <RadioGroupItem value={tone.value} id={tone.value} className="sr-only" />
              <div className={selectedTone === tone.value ? "text-primary" : "text-muted-foreground"}>
                {tone.icon}
              </div>
              <span className="text-xs font-medium text-foreground">{tone.label}</span>
              <span className="text-[10px] text-muted-foreground">{tone.description}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/* Generate Button */}
      <AnimatePresence mode="wait">
        {stage === "idle" && !generatedComment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button 
              onClick={handleGenerate} 
              className="w-full shimmer-button border-0 text-white" 
              disabled={isGenerating}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Comment
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <AnimatePresence mode="wait">
        {isGenerating && stage !== "complete" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Bot className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <span className="text-sm text-foreground">{stageMessages[stage]}</span>
              </div>
              <div className="relative">
                <Progress value={stageProgressMap[stage]} className="h-2" />
                <motion.div
                  className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50 opacity-50"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Comment Display */}
      <AnimatePresence mode="wait">
        {generatedComment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="glass-card p-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  <Bot className="mr-1 h-3 w-3" />
                  {generatedComment.personality}
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {generatedComment.tone}
                </Badge>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Authenticity</span>
                  <span className={`font-mono font-bold ${
                    generatedComment.authenticityScore >= 90 
                      ? "text-secondary" 
                      : generatedComment.authenticityScore >= 80 
                      ? "text-warning" 
                      : "text-muted-foreground"
                  }`}>
                    {generatedComment.authenticityScore}%
                  </span>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <div className="glow-input rounded-xl">
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={4}
                      className="resize-none bg-transparent border-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveEdit} className="shimmer-button border-0 text-white">
                      <Check className="mr-1 h-3 w-3" />
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-foreground leading-relaxed">{generatedComment.text}</p>
              )}
            </div>

            {/* Action Buttons */}
            {!isEditing && (
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  onClick={handleApprove}
                  className="shimmer-button border-0 text-white"
                >
                  <Check className="mr-1 h-3 w-3" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleEdit}
                  className="text-foreground"
                >
                  <Edit2 className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleRegenerate} 
                  disabled={isGenerating}
                  className="text-foreground"
                >
                  <RefreshCw className={`mr-1 h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
                  Regenerate
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleReject}
                  className="text-destructive"
                >
                  <X className="mr-1 h-3 w-3" />
                  Reject
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};