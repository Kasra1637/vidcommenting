import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  Rocket,
  Megaphone,
  Video,
  BarChart3,
  Settings,
  Users,
  CreditCard,
  HelpCircle,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    title: "COMMAND",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "AI Discovery", href: "/discovery", icon: Sparkles },
      { name: "Campaigns", href: "/campaigns", icon: Rocket },
    ],
  },
  {
    title: "MANAGE",
    items: [
      { name: "Brands", href: "/brands", icon: Megaphone },
      { name: "Videos", href: "/videos", icon: Video },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Account", href: "/settings/account", icon: Settings },
      { name: "Team", href: "/settings/team", icon: Users },
      { name: "Billing", href: "/settings/billing", icon: CreditCard },
    ],
  },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Floating Glass Sidebar */}
      <motion.aside
        className="fixed inset-y-4 left-4 z-50 flex w-60 flex-col rounded-2xl sidebar-glass"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {navigation.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * sectionIdx }}
            >
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                {section.title}
              </p>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const isActive =
                    location === item.href ||
                    (item.href !== "/dashboard" && location.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        className={cn(
                          "nav-item",
                          isActive && "nav-item-active"
                        )}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="h-4 w-4 text-white/90" />
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-sidebar-border/30 p-3">
          <div className="flex items-center gap-2">
            <Link href="/help" className="flex-1">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sidebar-foreground/70"
                >
                  <HelpCircle className="mr-2 h-4 w-4 text-white/90" />
                  Help
                </Button>
              </motion.div>
            </Link>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-sidebar-foreground/70"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4 text-white/90" />
                ) : (
                  <Sun className="h-4 w-4 text-white/90" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AppLayout;