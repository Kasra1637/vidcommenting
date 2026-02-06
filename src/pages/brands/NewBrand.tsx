import { useState } from "react";
import { useLocation } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Video,
  Search,
  Zap,
  Clock,
  Target,
  Eye,
  Timer,
  Globe,
  Users,
  Award,
  Send,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  { value: "youtube", label: "YouTube", icon: Video },
  { value: "tiktok", label: "TikTok", icon: Zap },
];

const industries = [
  { value: "technology", label: "Technology" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Marketing" },
  { value: "other", label: "Other" },
];

const brandTypes = [
  { value: "product", label: "Product", description: "Physical or digital product" },
  { value: "service", label: "Service", description: "Service-based business" },
  { value: "personal", label: "Personal Brand", description: "Individual or influencer" },
  { value: "agency", label: "Agency", description: "Marketing or creative agency" },
  { value: "startup", label: "Startup", description: "Early-stage company" },
];

const discoveryModes = [
  {
    value: "aggressive",
    label: "Aggressive",
    description: "Find 50+ videos daily, prioritize volume",
    icon: Zap,
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Find 20-30 relevant videos daily",
    icon: Target,
  },
  {
    value: "conservative",
    label: "Conservative",
    description: "Find 5-10 highly relevant videos daily",
    icon: Clock,
  },
];

const NewBrand = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [brandData, setBrandData] = useState({
    name: "",
    website: "",
    description: "",
    industry: "",
    brandType: "",
    targetAudience: "",
    uniqueValue: "",
    keywords: "",
    // AI Discovery settings
    aiDiscoveryEnabled: true,
    discoveryMode: "balanced",
    autoApprove: true,
    autoApproveHighQuality: true,
    contentTypes: [] as string[],
    excludeKeywords: "",
    minViewCount: "1000",
    maxVideoAge: "7",
    // Autonomous settings
    platforms: ["youtube", "tiktok"] as string[],
    dailyQuotaCap: 20,
    commentsPerVideo: 3,
    minAuthenticityScore: 85,
    minQualityScore: 80,
    autoPostEnabled: true,
    respectRateLimits: true,
  });
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleContentType = (type: string) => {
    setBrandData((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter((t) => t !== type)
        : [...prev.contentTypes, type],
    }));
  };

  const togglePlatform = (platform: string) => {
    setBrandData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Brand created!",
      description: brandData.aiDiscoveryEnabled
        ? "AI is now discovering relevant videos for your brand."
        : "Your brand has been created. Now let's add some videos.",
    });

    setLocation("/videos");
  };

  const totalSteps = 4;

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/brands")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brands
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Create New Brand</h1>
          <p className="mt-1 text-muted-foreground">
            Tell us about your brand so AI agents can find the perfect videos
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                  step >= num
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > num ? <Check className="h-4 w-4" /> : num}
              </div>
              {num < totalSteps && (
                <div
                  className={`h-0.5 w-16 transition-all ${
                    step > num ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-xl border bg-card p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Brand Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Olovka AI"
                    value={brandData.name}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the exact term people will Google after seeing your
                    comments
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://yourbrand.com"
                      value={brandData.website}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                    <Button variant="outline" size="icon" className="h-11 w-11">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select
                      value={brandData.industry}
                      onValueChange={(value) =>
                        handleSelectChange("industry", value)
                      }
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Type</Label>
                    <Select
                      value={brandData.brandType}
                      onValueChange={(value) =>
                        handleSelectChange("brandType", value)
                      }
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {brandTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Brand Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="What does your brand do? What problem does it solve?"
                    value={brandData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Target Audience</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">
                    Who is your target audience?
                  </Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    placeholder="e.g., Startup founders, SaaS marketers, indie hackers looking for AI tools"
                    value={brandData.targetAudience}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uniqueValue">
                    What makes your brand unique?
                  </Label>
                  <Textarea
                    id="uniqueValue"
                    name="uniqueValue"
                    placeholder="What differentiates you from competitors?"
                    value={brandData.uniqueValue}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Relevant Keywords</Label>
                  <Textarea
                    id="keywords"
                    name="keywords"
                    placeholder="Enter keywords separated by commas (e.g., AI writing, content creation, automation)"
                    value={brandData.keywords}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    These help AI agents find videos where your brand fits
                    naturally
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* AI Working Header */}
              <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">
                  AI is working for {brandData.name || "Your Brand"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our AI discovery agents will automatically find and queue the most
                  relevant videos for your brand every day. You'll have{" "}
                  <span className="font-medium text-foreground">24 hours</span> to
                  review and approve each video, or they'll be approved and posted
                  automatically for a fully autonomous experience.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Video className="h-5 w-5 text-success" />
                  </div>
                  <h3 className="font-semibold">Auto Discovery</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    AI agents find relevant videos daily based on your brand
                    description and target audience
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Smart Approval</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Review within 24hrs or let AI auto-approve generated comments
                    on high-quality matches
                  </p>
                </div>
              </div>

              {/* Enable Toggle */}
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Enable Autonomous Discovery</p>
                    <p className="text-sm text-muted-foreground">
                      AI will automatically find and suggest videos
                    </p>
                  </div>
                </div>
                <Switch
                  checked={brandData.aiDiscoveryEnabled}
                  onCheckedChange={(checked) =>
                    setBrandData((prev) => ({
                      ...prev,
                      aiDiscoveryEnabled: checked,
                    }))
                  }
                />
              </div>

              {brandData.aiDiscoveryEnabled && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Discovery Mode</Label>
                    <RadioGroup
                      value={brandData.discoveryMode}
                      onValueChange={(value) =>
                        handleSelectChange("discoveryMode", value)
                      }
                      className="space-y-2"
                    >
                      {discoveryModes.map((mode) => (
                        <label
                          key={mode.value}
                          className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                            brandData.discoveryMode === mode.value
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <RadioGroupItem value={mode.value} />
                          <mode.icon className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">{mode.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {mode.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Autonomous Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure fully autonomous operation with no manual intervention
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Content Types to Target */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Content Types to Target</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Tutorials",
                      "Reviews",
                      "Podcasts",
                      "Vlogs",
                      "How-to",
                      "Interviews",
                      "News",
                      "Entertainment",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleContentType(type)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          brandData.contentTypes.includes(type)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select the types of content where your brand fits naturally
                  </p>
                </div>

                {/* Platform Selection */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Platform Scanning</h3>
                  </div>
                  <div className="flex gap-3">
                    {platforms.map((platform) => (
                      <button
                        key={platform.value}
                        type="button"
                        onClick={() => togglePlatform(platform.value)}
                        className={`flex items-center gap-2 rounded-lg border px-4 py-3 transition-all ${
                          brandData.platforms.includes(platform.value)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <platform.icon className={`h-5 w-5 ${
                          brandData.platforms.includes(platform.value) ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <span className="font-medium">{platform.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI will autonomously scan selected platforms for relevant videos
                  </p>
                </div>

                {/* Daily Quota Cap */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Daily Video Quota</h3>
                    </div>
                    <span className="text-lg font-semibold text-primary">{brandData.dailyQuotaCap} videos</span>
                  </div>
                  <Slider
                    value={[brandData.dailyQuotaCap]}
                    onValueChange={(value) => setBrandData(prev => ({ ...prev, dailyQuotaCap: value[0] }))}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    AI will process up to 20% of this quota daily for discovery
                  </p>
                </div>

                {/* Comments Per Video */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Comment Candidates Per Video</h3>
                    </div>
                    <span className="text-lg font-semibold text-primary">{brandData.commentsPerVideo}</span>
                  </div>
                  <Slider
                    value={[brandData.commentsPerVideo]}
                    onValueChange={(value) => setBrandData(prev => ({ ...prev, commentsPerVideo: value[0] }))}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    AI generates multiple candidates, evaluates quality, and queues the best one
                  </p>
                </div>

                {/* Quality Thresholds */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Quality Thresholds</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Min. Authenticity Score</Label>
                        <span className="text-sm font-medium text-success">{brandData.minAuthenticityScore}%</span>
                      </div>
                      <Slider
                        value={[brandData.minAuthenticityScore]}
                        onValueChange={(value) => setBrandData(prev => ({ ...prev, minAuthenticityScore: value[0] }))}
                        max={99}
                        min={70}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Min. Quality Score</Label>
                        <span className="text-sm font-medium text-primary">{brandData.minQualityScore}%</span>
                      </div>
                      <Slider
                        value={[brandData.minQualityScore]}
                        onValueChange={(value) => setBrandData(prev => ({ ...prev, minQualityScore: value[0] }))}
                        max={99}
                        min={70}
                        step={1}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only comments meeting these thresholds will be queued for posting
                  </p>
                </div>

                {/* Smart Approval Settings */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Timer className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Smart Approval Settings</h3>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Auto-approve after 24 hours</p>
                      <p className="text-sm text-muted-foreground">
                        Approve comments automatically if not reviewed within 24hrs
                      </p>
                    </div>
                    <Switch
                      checked={brandData.autoApprove}
                      onCheckedChange={(checked) =>
                        setBrandData((prev) => ({
                          ...prev,
                          autoApprove: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Auto-approve high-quality matches</p>
                      <p className="text-sm text-muted-foreground">
                        Instantly approve comments on videos with 90%+ relevance
                      </p>
                    </div>
                    <Switch
                      checked={brandData.autoApproveHighQuality}
                      onCheckedChange={(checked) =>
                        setBrandData((prev) => ({
                          ...prev,
                          autoApproveHighQuality: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Auto Posting */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Autonomous Posting</h3>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Enable auto-posting</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically post approved comments without manual review
                      </p>
                    </div>
                    <Switch
                      checked={brandData.autoPostEnabled}
                      onCheckedChange={(checked) =>
                        setBrandData((prev) => ({
                          ...prev,
                          autoPostEnabled: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">Respect platform rate limits</p>
                      <p className="text-sm text-muted-foreground">
                        Space out posts to avoid detection and follow platform rules
                      </p>
                    </div>
                    <Switch
                      checked={brandData.respectRateLimits}
                      onCheckedChange={(checked) =>
                        setBrandData((prev) => ({
                          ...prev,
                          respectRateLimits: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Targeting Parameters */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Targeting Parameters</h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minViewCount">Minimum View Count</Label>
                      <Select
                        value={brandData.minViewCount}
                        onValueChange={(value) =>
                          handleSelectChange("minViewCount", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100+ views</SelectItem>
                          <SelectItem value="1000">1,000+ views</SelectItem>
                          <SelectItem value="10000">10,000+ views</SelectItem>
                          <SelectItem value="100000">100,000+ views</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxVideoAge">Maximum Video Age</Label>
                      <Select
                        value={brandData.maxVideoAge}
                        onValueChange={(value) =>
                          handleSelectChange("maxVideoAge", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Last 24 hours</SelectItem>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excludeKeywords">Exclude Keywords</Label>
                    <Textarea
                      id="excludeKeywords"
                      name="excludeKeywords"
                      placeholder="Keywords to avoid (comma separated)"
                      value={brandData.excludeKeywords}
                      onChange={handleInputChange}
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Videos containing these keywords will be excluded
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-success/10 to-primary/10 p-4">
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    What happens next?
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• AI agents will start scanning for relevant videos</li>
                    <li>• Videos matching your criteria will be queued daily</li>
                    <li>• Comments will be generated and ready for your review</li>
                    {brandData.autoApprove && (
                      <li className="text-primary font-medium">
                        • Auto-approval enabled: comments post after 24hrs if not reviewed
                      </li>
                    )}
                    {brandData.autoApproveHighQuality && (
                      <li className="text-success font-medium">
                        • High-quality matches will be approved instantly
                      </li>
                    )}
                    {brandData.autoPostEnabled && (
                      <li className="text-primary font-medium">
                        • Comments will be posted automatically
                      </li>
                    )}
                    <li>• {brandData.commentsPerVideo} candidates generated per video</li>
                    <li>• Only {brandData.minAuthenticityScore}%+ authenticity comments posted</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={() => {
                if (step < totalSteps) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              disabled={isLoading}
            >
              {isLoading
                ? "Creating..."
                : step === totalSteps
                ? "Create Brand"
                : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewBrand;
