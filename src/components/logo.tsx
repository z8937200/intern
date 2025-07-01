import * as React from 'react'

const PokeballIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M2 12h20" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
)

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2 font-headline font-semibold text-lg">
      <PokeballIcon className="h-7 w-7 text-primary" />
      <span>React 實習生道館</span>
    </div>
  )
}
