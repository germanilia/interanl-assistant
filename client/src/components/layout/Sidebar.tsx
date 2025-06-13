import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Server,
  Brain,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  GitBranch,
  Plug,
  FileText,
  Users,
  Lock,
  Shield,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Logo } from '@/components/ui/logo';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';

interface NavItemChild {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
  children?: NavItemChild[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Configuration',
    icon: Settings,
    children: [
      { title: 'MCP Servers', href: '/config/mcp-servers', icon: Server },
      { title: 'Connectors', href: '/config/connectors', icon: Plug },
    ],
  },
  {
    title: 'Knowledge Base',
    href: '/knowledge-base',
    icon: BookOpen,
  },
  {
    title: 'RAG Tuning',
    href: '/rag-tuning',
    icon: Brain,
  },
  {
    title: 'Analytics',
    icon: TrendingUp,
    children: [
      { title: 'Usage Metrics', href: '/analytics/usage', icon: BarChart3 },
      { title: 'Prompt Search', href: '/analytics/prompts', icon: Search },
      { title: 'Reports', href: '/analytics/reports', icon: FileText },
    ],
  },
  {
    title: 'User Management',
    icon: Users,
    children: [
      { title: 'Users & Roles', href: '/users/management', icon: UserCheck },
      { title: 'Permissions', href: '/users/permissions', icon: Lock },
      { title: 'ACL Analyzer', href: '/users/acl', icon: Shield },
    ],
  },
  {
    title: 'Workflows',
    href: '/workflows',
    icon: GitBranch,
  },
  {
    title: 'Guardrails',
    href: '/guardrails',
    icon: AlertTriangle,
  },
];

interface SidebarProps {
  className?: string;
}

// Shared navigation content component
const NavigationContent: React.FC<{
  isOpen: boolean;
  isMobile: boolean;
  toggle: () => void;
  close?: () => void;
}> = ({ isOpen, isMobile, toggle, close }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand sections that contain the current active page
  useEffect(() => {
    const currentPath = location.pathname;
    const itemToExpand = navItems.find(item =>
      item.children?.some(child => child.href === currentPath)
    );

    if (itemToExpand && !expandedItems.includes(itemToExpand.title)) {
      setExpandedItems(prev => [...prev, itemToExpand.title]);
    }
  }, [location.pathname]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const filteredNavItems = navItems.filter(item =>
    !item.adminOnly || user?.role === 'admin'
  );

  const handleLinkClick = () => {
    if (isMobile && close) {
      close();
    }
  };

  return (
    <>
      {/* Header */}
      <div className={cn(
        "flex h-16 items-center justify-between px-4 border-b border-border",
        isMobile && "border-0"
      )}>
        {(isOpen || isMobile) && (
          <Logo width={120} height={32} className="h-8" />
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="px-2 py-4 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href ? location.pathname === item.href : false;
            const hasChildren = item.children && item.children.length > 0;

            // Filter children based on admin status
            const filteredChildren = item.children?.filter(
              child => !child.adminOnly || user?.role === 'admin'
            );

            // Skip rendering if it's a parent with no visible children
            if (hasChildren && (!filteredChildren || filteredChildren.length === 0)) {
              return null;
            }

            return (
              <div key={item.title}>
                {hasChildren ? (
                  <div>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        "text-muted-foreground hover:text-foreground hover:bg-accent",
                        !isOpen && !isMobile && "justify-center px-2"
                      )}
                      onClick={() => {
                        if (!isOpen && !isMobile) {
                          // If sidebar is collapsed, expand it first
                          toggle();
                          // Then expand this section
                          setTimeout(() => {
                            setExpandedItems(prev =>
                              prev.includes(item.title) ? prev : [...prev, item.title]
                            );
                          }, 100);
                        } else {
                          // If sidebar is open or mobile, just toggle the section
                          toggleExpanded(item.title);
                        }
                      }}
                      title={!isOpen && !isMobile ? item.title : undefined}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 mr-2" />
                      {(isOpen || isMobile) && (
                        <>
                          <span>{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform",
                              expandedItems.includes(item.title) ? "rotate-180" : "",
                            )}
                          />
                        </>
                      )}
                    </Button>
                    {(isOpen || isMobile) && expandedItems.includes(item.title) && filteredChildren && (
                      <div className="ml-4 mt-1 space-y-1">
                        {filteredChildren.map((child) => {
                          const ChildIcon = child.icon;
                          const isChildActive = location.pathname === child.href;

                          return (
                            <Link key={child.href} to={child.href} onClick={handleLinkClick}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-sm",
                                  isChildActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                                )}
                              >
                                <ChildIcon className="mr-2 h-3 w-3" />
                                {child.title}
                              </Button>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.href || '#'} onClick={handleLinkClick}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
                        !isOpen && !isMobile && "justify-center px-2"
                      )}
                      title={!isOpen && !isMobile ? item.title : undefined}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 mr-2" />
                      {(isOpen || isMobile) && <span>{item.title}</span>}
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {(isOpen || isMobile) && (
        <>
          <Separator />
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.full_name || user?.email}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { isOpen, toggle, isMobile, close } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
        <SheetContent side="left" className="w-64 p-0">
          <NavigationContent
            isOpen={true}
            isMobile={true}
            toggle={toggle}
            close={close}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full flex-col bg-card border-r border-border transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        className
      )}
    >
      <NavigationContent
        isOpen={isOpen}
        isMobile={false}
        toggle={toggle}
      />
    </div>
  );
};
