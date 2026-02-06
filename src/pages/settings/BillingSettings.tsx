import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  CreditCard,
  Download,
  Calendar,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    id: "lite",
    name: "Lite",
    price: 249,
    description: "Perfect for startups and small businesses",
    features: [
      "Comment on 100 videos",
      "Promote 1 brand",
      "Invite 1 team member",
      "Auto-boosting comments",
    ],
    gradient: "card-gradient-lite",
  },
  {
    id: "standard",
    name: "Standard",
    price: 729,
    description: "For businesses starting to scale",
    features: [
      "Comment on 300 videos",
      "Promote 3 brands",
      "Invite 3 team members",
      "Advanced analytics",
    ],
    gradient: "card-gradient-standard",
    popular: true,
  },
  {
    id: "plus",
    name: "Plus",
    price: 1349,
    description: "For agencies doubling down",
    features: [
      "Comment on 600 videos",
      "Promote 5 brands",
      "Invite 5 team members",
      "Auto-adding videos",
    ],
    gradient: "card-gradient-plus",
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 4999,
    description: "Enterprise solution",
    features: [
      "Comment on 3,000 videos",
      "Unlimited brands",
      "Unlimited team members",
      "Dedicated account manager",
    ],
    gradient: "card-gradient-ultimate",
  },
];

const invoices = [
  { id: "1", date: "Feb 1, 2024", amount: "$249.00", status: "paid" },
  { id: "2", date: "Jan 1, 2024", amount: "$249.00", status: "paid" },
  { id: "3", date: "Dec 1, 2023", amount: "$249.00", status: "paid" },
];

const BillingSettings = () => {
  const { toast } = useToast();
  const [currentPlan] = useState("lite");

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Redirecting to checkout...",
      description: `Upgrading to ${planId} plan`,
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription cancelled",
      description: "Your subscription will end at the current billing period.",
      variant: "destructive",
    });
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your subscription and billing information
          </p>
        </div>

        {/* Current Plan */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-foreground">
                  Current Plan
                </h2>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  Lite
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                $249/month • Renews on March 1, 2024
              </p>
            </div>
            <Button variant="outline" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </div>

          {/* Usage */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Videos</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: "45%" }}
                  />
                </div>
                <span className="text-sm font-medium">45 / 100</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Brands</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="text-sm font-medium">1 / 1</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="text-sm font-medium">1 / 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Available Plans
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl p-5 ${plan.gradient} ${
                  currentPlan === plan.id ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                      Popular
                    </span>
                  </div>
                )}
                <div className="mt-2">
                  <h3 className="font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {plan.description}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Check className="h-3 w-3 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-4 w-full"
                    variant={currentPlan === plan.id ? "outline" : "default"}
                    disabled={currentPlan === plan.id}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
                    {currentPlan !== plan.id && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                Payment Method
              </h2>
            </div>
            <Button variant="outline">Update</Button>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-muted/50 p-4">
            <div className="flex h-10 w-16 items-center justify-center rounded bg-background">
              <span className="text-sm font-bold">VISA</span>
            </div>
            <div>
              <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/25</p>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Billing History
            </h2>
          </div>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-lg bg-muted/30 p-4"
              >
                <div>
                  <p className="font-medium text-foreground">{invoice.amount}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                    Paid
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BillingSettings;
