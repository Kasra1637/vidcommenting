import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import BrandCard from "@/components/dashboard/BrandCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Building2, Tag } from "lucide-react";
import { Link } from "wouter";

const industries = [
  { value: "all", label: "All Industries" },
  { value: "technology", label: "Technology" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Marketing" },
];

const brandTypes = [
  { value: "all", label: "All Types" },
  { value: "product", label: "Product" },
  { value: "service", label: "Service" },
  { value: "personal", label: "Personal Brand" },
  { value: "agency", label: "Agency" },
  { value: "startup", label: "Startup" },
];

const brandsData = [
  {
    id: "1",
    name: "Olovka AI",
    reach: 1250000,
    videos: 45,
    performing: 12,
    stagnated: 8,
    needsBoost: 15,
    inactive: 10,
    industry: "technology",
    brandType: "product",
  },
  {
    id: "2",
    name: "Wisebits",
    reach: 890000,
    videos: 32,
    performing: 8,
    stagnated: 5,
    needsBoost: 12,
    inactive: 7,
    industry: "saas",
    brandType: "service",
  },
  {
    id: "3",
    name: "Teract",
    reach: 260000,
    videos: 10,
    performing: 3,
    stagnated: 2,
    needsBoost: 4,
    inactive: 1,
    industry: "marketing",
    brandType: "agency",
  },
  {
    id: "4",
    name: "ShortlistIQ",
    reach: 540000,
    videos: 22,
    performing: 6,
    stagnated: 4,
    needsBoost: 8,
    inactive: 4,
    industry: "technology",
    brandType: "startup",
  },
];

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("reach");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [brandTypeFilter, setBrandTypeFilter] = useState("all");

  const filteredBrands = brandsData
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((brand) =>
      industryFilter === "all" ? true : brand.industry === industryFilter
    )
    .filter((brand) =>
      brandTypeFilter === "all" ? true : brand.brandType === brandTypeFilter
    )
    .sort((a, b) => {
      if (sortBy === "reach") return b.reach - a.reach;
      if (sortBy === "videos") return b.videos - a.videos;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Brands</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your brand awareness campaigns
              </p>
            </div>
            <Link href="/brands/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Brand
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-[160px]">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={brandTypeFilter} onValueChange={setBrandTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <Tag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Brand Type" />
              </SelectTrigger>
              <SelectContent>
                {brandTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reach">Highest Reach</SelectItem>
                <SelectItem value="videos">Most Videos</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 py-16">
            <p className="text-muted-foreground">No brands found</p>
            <Link href="/brands/new" className="mt-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create your first brand
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Brands;
