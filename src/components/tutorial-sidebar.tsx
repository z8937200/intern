"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { Variable, Braces, Waypoints, ArrowRightLeft, EqualNot, LayoutGrid, Package, RefreshCw, Zap, Pin, Text, ClipboardCheck } from 'lucide-react'
import { useLoading } from '@/context/loading-context'

const menuItems = [
  {
    group: 'JavaScript 基礎',
    items: [
      { href: '/variables', label: '變數宣告', icon: Variable },
      { href: '/equality', label: '相等運算子', icon: EqualNot },
      { href: '/string-concatenation', label: '字串與樣板', icon: Text },
      { href: '/ternary', label: '三元運算子', icon: Braces },
      { href: '/logical-operators', label: '邏輯運算子', icon: Waypoints },
      { href: '/arrow-functions', label: '箭頭函式', icon: ArrowRightLeft },
    ],
  },
  {
    group: '樣式與排版',
    items: [
      { href: '/grid-game', label: 'Tailwind Grid 遊戲', icon: LayoutGrid },
    ]
  },
   {
    group: 'React 基礎',
    items: [
      { href: '/components-props', label: 'Components & Props', icon: Package },
      { href: '/usestate', label: 'useState', icon: RefreshCw },
      { href: '/useeffect', label: 'useEffect', icon: Zap },
      { href: '/useref', label: 'useRef', icon: Pin },
      { href: '/react-hook-form', label: 'React Hook Form', icon: ClipboardCheck },
    ],
  }
];


export function TutorialSidebar() {
  const pathname = usePathname()
  const { setIsLoading } = useLoading()

  const handleLinkClick = (href: string) => {
    // Only show loading indicator if navigating to a different page
    if (pathname !== href) {
      setIsLoading(true);
    }
  };

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: 'right', align: 'center' }}
                  >
                    <Link href={item.href} onClick={() => handleLinkClick(item.href)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </>
  )
}
