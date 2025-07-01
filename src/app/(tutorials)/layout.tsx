"use client";

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { TutorialSidebar } from '@/components/tutorial-sidebar';
import { TutorialHeader } from '@/components/tutorial-header';
import { LoadingProvider, useLoading } from '@/context/loading-context';
import { FullScreenLoading } from '@/components/ui/full-screen-loading';

// This component uses the loading context and contains the main layout structure.
function LayoutWithLoading({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const { setIsLoading } = useLoading();
  
    // This effect will run when the route changes, hiding the loading overlay.
    useEffect(() => {
      setIsLoading(false);
    }, [pathname, setIsLoading]);
  
    return (
      <SidebarProvider>
        <Sidebar>
          <TutorialSidebar />
        </Sidebar>
        <SidebarInset className="bg-card bg-mimikyu">
          <TutorialHeader />
          <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
}

// The main layout now wraps the application with the LoadingProvider
// and includes the FullScreenLoading overlay.
export default function TutorialLayout({ children }: PropsWithChildren) {
  return (
    <LoadingProvider>
      <LayoutWithLoading>{children}</LayoutWithLoading>
      <FullScreenLoading />
    </LoadingProvider>
  );
}
