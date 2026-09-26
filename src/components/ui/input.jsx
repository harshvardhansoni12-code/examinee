import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-2xl border-2 border-[#191919] bg-[#FFFDF9] px-4 py-2 text-base font-medium text-[#171717] placeholder:text-[#888888] shadow-brutal-sm transition-all outline-none focus:border-[#E85B9C] focus:ring-4 focus:ring-[#FCE7F1] focus:shadow-brutal disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F2EB] disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}

export { Input };
