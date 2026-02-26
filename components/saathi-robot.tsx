import { cn } from "@/lib/utils"

interface SaathiRobotProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animate?: boolean
}

export function SaathiRobot({ className, size = "md", animate = false }: SaathiRobotProps) {
  const sizeMap = { sm: "size-7", md: "size-9", lg: "size-14" }
  const innerMap = { sm: 28, md: 36, lg: 56 }

  return (
    <div className={cn(sizeMap[size], "relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 64 64"
        width={innerMap[size]}
        height={innerMap[size]}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(animate && "animate-bounce [animation-duration:2s]")}
      >
        {/* Antenna */}
        <circle cx="32" cy="6" r="3.5" className="fill-primary" />
        <rect x="30.5" y="8" width="3" height="8" rx="1.5" className="fill-primary/70" />

        {/* Head */}
        <rect x="12" y="14" width="40" height="28" rx="10" className="fill-primary/15 stroke-primary" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="24" cy="28" r="5" className="fill-background stroke-primary" strokeWidth="1.5" />
        <circle cx="40" cy="28" r="5" className="fill-background stroke-primary" strokeWidth="1.5" />
        <circle cx="25" cy="27" r="2.5" className="fill-primary">
          {animate && (
            <animate attributeName="cx" values="25;23;25;27;25" dur="3s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="41" cy="27" r="2.5" className="fill-primary">
          {animate && (
            <animate attributeName="cx" values="41;39;41;43;41" dur="3s" repeatCount="indefinite" />
          )}
        </circle>

        {/* Mouth - cute smile */}
        <path d="M26 34 Q32 39 38 34" className="stroke-primary" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Cheeks */}
        <circle cx="18" cy="32" r="2.5" className="fill-chart-4/30" />
        <circle cx="46" cy="32" r="2.5" className="fill-chart-4/30" />

        {/* Ears */}
        <rect x="6" y="22" width="6" height="14" rx="3" className="fill-primary/20 stroke-primary/50" strokeWidth="1" />
        <rect x="52" y="22" width="6" height="14" rx="3" className="fill-primary/20 stroke-primary/50" strokeWidth="1" />

        {/* Body */}
        <rect x="18" y="44" width="28" height="16" rx="6" className="fill-primary/10 stroke-primary/60" strokeWidth="1.5" />

        {/* Body detail - heart */}
        <path d="M29 50 C29 48 32 46 32 49 C32 46 35 48 35 50 C35 53 32 55 32 55 C32 55 29 53 29 50Z" className="fill-primary/40" />

        {/* Arms */}
        <rect x="10" y="46" width="8" height="4" rx="2" className="fill-primary/20 stroke-primary/40" strokeWidth="1" />
        <rect x="46" y="46" width="8" height="4" rx="2" className="fill-primary/20 stroke-primary/40" strokeWidth="1" />
      </svg>
    </div>
  )
}
