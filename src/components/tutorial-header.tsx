"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";

export function TutorialHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card/50 px-6 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-lg font-semibold">React 實習生道館</h1>
        </header>
    );
}
