import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-bold tracking-tight rounded-xl transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#E85B9C] text-white hover:bg-[#C93678] border-2 border-[#191919] shadow-brutal-sm hover:shadow-brutal active:shadow-none",
        outline:
          "bg-[#FFFDF9] text-[#191919] hover:bg-[#F5F2EB] border-2 border-[#191919] shadow-brutal-sm hover:shadow-brutal active:shadow-none",
        secondary:
          "bg-[#FFF3D6] text-[#8A5800] hover:bg-[#FDE68A] border-2 border-[#191919] shadow-brutal-sm hover:shadow-brutal active:shadow-none",
        pinkSoft:
          "bg-[#FCE7F1] text-[#C93678] hover:bg-[#F9A8D4] border-2 border-[#191919] shadow-brutal-sm hover:shadow-brutal active:shadow-none",
        ghost:
          "bg-transparent text-[#191919] hover:bg-[#FCE7F1] hover:text-[#C93678]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] border-2 border-[#191919] shadow-brutal-sm hover:shadow-brutal active:shadow-none",
        link: "text-[#E85B9C] underline-offset-4 hover:underline",
        mcq: "bg-[#FCE7F1] text-[#C93678] border-2 border-[#191919] shadow-brutal-sm rounded-full",
        summary: "bg-[#FFF3D6] text-[#8A5800] border-2 border-[#191919] shadow-brutal-sm rounded-full",
        cards: "bg-[#D1FAE5] text-[#065F46] border-2 border-[#191919] shadow-brutal-sm rounded-full",
      },
      size: {
        default: "h-11 px-5 py-2 text-sm",
        xs: "h-7 px-2.5 text-xs rounded-lg",
        sm: "h-9 px-3.5 text-xs rounded-lg",
        lg: "h-13 px-8 text-base rounded-2xl",
        icon: "h-10 w-10 p-0 rounded-xl",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
        "icon-lg": "h-12 w-12 p-0 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
