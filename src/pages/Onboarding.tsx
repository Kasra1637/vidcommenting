import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Building2, Users, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "lite",
    name: "Lite",
    price: "$249",
    description: "Perfect for startups",
    features: ["100 videos", "1 brand", "1 team member"],
    gradient: "card-gradient-lite",
  },
  {
    id: "standard",
    name: "Standard",
    price: "$729",
    description: "For scaling businesses",
    features: ["300 videos", "3 brands", "3 team members"],
    gradient: "card-gradient-standard",
    popular: true,
  },
  {
    id: "plus",
    name: "Plus",
    price: "$1,349",
    description: "For agencies",
    features: ["600 videos", "5 brands", "5 team members"],
    gradient: "card-gradient-plus",
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const steps = [
    { number: 1, label: "Profile", icon: Users },
    { number: 2, label: "Team", icon: Building2 },
    { number: 3, label: "Plan", icon: CreditCard },
  ];

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Welcome to Rumora!",
        description: "Your workspace is ready. Let's create your first brand.",
      });
      
      setLocation("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl animate-slide-up">
        <div className="mb-8 flex items-center justify-center gap-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    step >= s.number
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {step > s.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                {s.number < 3 && (
                  <div
                    className={`h-0.5 w-16 transition-all ${
                      step > s.number ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-lg">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground">Tell us about yourself</h2>
                <p className="mt-2 text-muted-foreground">
                  This helps personalize your experience
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground">Create your workspace</h2>
                <p className="mt-2 text-muted-foreground">
                  This is your collaborative environment for managing campaigns
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Workspace Name</Label>
                  <Input
                    id="teamName"
                    type="text"
                    placeholder="My Company"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground">Choose your plan</h2>
                <p className="mt-2 text-muted-foreground">
                  Start with a 7-day free trial. Cancel anytime.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative cursor-pointer rounded-xl p-4 transition-all ${plan.gradient} ${
                      selectedPlan === plan.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:shadow-md"
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
                      <p className="text-xs text-muted-foreground">{plan.description}</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {plan.price}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </p>
                      <ul className="mt-3 space-y-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="h-3 w-3 text-success" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading ? "Setting up..." : step === 3 ? "Start free trial" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
