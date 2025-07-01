"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <div
      className={cn(
        'relative my-4 rounded-lg bg-muted p-4 font-code text-sm',
        className
      )}
    >
      <pre className="overflow-x-auto">{code}</pre>
      <TooltipProvider>
        <Tooltip open={hasCopied}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy code</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copied!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
