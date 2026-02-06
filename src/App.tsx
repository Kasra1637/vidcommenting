import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";

import Onboarding from "./pages/Onboarding";

import Dashboard from "./pages/Dashboard";
import Discovery from "./pages/Discovery";
import Campaigns from "./pages/Campaigns";
import Brands from "./pages/Brands";
import NewBrand from "./pages/brands/NewBrand";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/videos/VideoDetail";
import Analytics from "./pages/Analytics";

import AccountSettings from "./pages/settings/AccountSettings";
import TeamSettings from "./pages/settings/TeamSettings";
import BillingSettings from "./pages/settings/BillingSettings";

import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Switch>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
        
        <Route path="/onboarding" component={Onboarding} />
        
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/campaigns" component={Campaigns} />
        <Route path="/brands" component={Brands} />
        <Route path="/brands/new" component={NewBrand} />
        <Route path="/brands/:id" component={Brands} />
        <Route path="/videos" component={Videos} />
        <Route path="/videos/:id" component={VideoDetail} />
        <Route path="/analytics" component={Analytics} />
        
        <Route path="/settings/account" component={AccountSettings} />
        <Route path="/settings/team" component={TeamSettings} />
        <Route path="/settings/billing" component={BillingSettings} />
        
        <Route component={NotFound} />
      </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
