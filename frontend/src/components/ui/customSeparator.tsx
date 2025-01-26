import React from 'react'
import { cn } from "@/lib/utils";


export function CustomSeparator({ className }: { className?: string }) {
  return (
    <div className="relative w-[80%] h-[1px] mx-auto">
      <div className={cn(
        "absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent",
        className
      )} />
      <div
        className="absolute w-full h-[1px] bg-gradient-to-r 
          from-transparent via-primary/20 to-transparent transform -skew-x-12 blur-[0.5px]"
      />
      <div
        className="absolute w-1/2 h-[1px] left-1/4 bg-gradient-to-r 
          from-transparent via-primary/10 to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
}
