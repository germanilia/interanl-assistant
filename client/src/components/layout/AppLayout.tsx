import React from 'react';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayoutContent: React.FC<AppLayoutProps> = ({ children }) => {
  const { isOpen, isMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Unified Sidebar - handles both mobile and desktop */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 z-40 h-full">
          <Sidebar />
        </aside>
      )}

      {/* Mobile Navigation - rendered by Sidebar component */}
      {isMobile && <Sidebar />}

      {/* Fixed Header */}
      <div
        className={cn(
          "fixed top-0 right-0 z-30 transition-all duration-300",
          !isMobile && isOpen && "left-64",
          !isMobile && !isOpen && "left-16",
          isMobile && "left-0"
        )}
      >
        <Header />
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          !isMobile && isOpen && "ml-64",
          !isMobile && !isOpen && "ml-16"
        )}
      >
        {/* Page Content with top padding for fixed header */}
        <main className="flex-1 px-4 lg:px-6 pb-4 lg:pb-6 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
};
