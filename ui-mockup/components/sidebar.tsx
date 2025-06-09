"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Settings,
  BarChart3,
  Search,
  Users,
  Shield,
  Workflow,
  Server,
  Plug,
  Brain,
  FileText,
  TrendingUp,
  UserCheck,
  Lock,
  GitBranch,
  AlertTriangle,
  BookOpen,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Configuration",
    icon: Settings,
    children: [
      { name: "MCP Servers", href: "/config/mcp-servers", icon: Server },
      { name: "Connectors", href: "/config/connectors", icon: Plug },
    ],
  },
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: BookOpen,
  },
  {
    name: "RAG Tuning",
    href: "/rag-tuning",
    icon: Brain,
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    children: [
      { name: "Usage Metrics", href: "/analytics/usage", icon: BarChart3 },
      { name: "Prompt Search", href: "/analytics/prompts", icon: Search },
      { name: "Reports", href: "/analytics/reports", icon: FileText },
    ],
  },
  {
    name: "User Management",
    icon: Users,
    children: [
      { name: "Users & Roles", href: "/users/management", icon: UserCheck },
      { name: "Permissions", href: "/users/permissions", icon: Lock },
      { name: "ACL Analyzer", href: "/users/acl", icon: Shield },
    ],
  },
  {
    name: "Workflows",
    href: "/workflows",
    icon: Workflow,
  },
  {
    name: "Guardrails",
    href: "/guardrails",
    icon: AlertTriangle,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">GenAI ChatOps</h1>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
                    onClick={() => toggleExpanded(item.name)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                    <GitBranch
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        expandedItems.includes(item.name) ? "rotate-90" : "",
                      )}
                    />
                  </Button>
                  {expandedItems.includes(item.name) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.name} href={child.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-sm",
                              pathname === child.href
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                            )}
                          >
                            <child.icon className="mr-2 h-3 w-3" />
                            {child.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
