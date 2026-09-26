"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, BookOpenCheck, WalletCards, FileText, LayoutDashboard } from "lucide-react";
import { UserButton } from "../../../auth/components/UserButton";

export const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const LogoClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const navLinks = session
    ? [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Mock Tests", href: "/mcq", icon: BookOpenCheck },
        { name: "Flashcards", href: "/revision-cards", icon: WalletCards },
        { name: "Summaries", href: "/summary", icon: FileText },
      ]
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 px-4 md:px-10 flex justify-between items-center bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-[#191919] z-50 transition-all">
      {/* Brand Logo */}
      <div
        className="flex items-center gap-2.5 cursor-pointer select-none group"
        onClick={LogoClick}
      >
        <div className="w-10 h-10 rounded-xl bg-[#E85B9C] border-2 border-[#191919] flex items-center justify-center text-white font-extrabold shadow-brutal-sm group-hover:-rotate-6 transition-transform">
          <Sparkles className="w-5 h-5 fill-white" />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl font-black tracking-tight text-[#191919] leading-none flex items-center">
            EXAM<span className="text-[#E85B9C]">INEE</span>
          </div>
          <span className="text-[10px] font-bold text-[#6B6B6B] tracking-wider uppercase">
            AI Study Studio
          </span>
        </div>
      </div>

      {/* Center Nav Items (when logged in) */}
      {session && (
        <nav className="hidden lg:flex items-center gap-2 bg-[#F5F2EB] p-1.5 rounded-full border-2 border-[#191919] shadow-brutal-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#E85B9C] text-white shadow-sm"
                    : "text-[#191919] hover:bg-[#FFFDF9] hover:text-[#C93678]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Right User & CTA Area */}
      <div className="flex items-center gap-3">
        <UserButton />
      </div>
    </header>
  );
};
