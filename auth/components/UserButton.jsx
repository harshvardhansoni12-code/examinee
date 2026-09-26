"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, LayoutDashboard, ChevronDown, BookOpenCheck, WalletCards, FileText, ArrowRight, User } from "lucide-react";

export const UserButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Loading skeleton
  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#F4F0E8] border-2 border-[#191919] animate-pulse"></div>
    );
  }

  // Not signed in
  if (!session || !session.user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/authpage")}
          className="btn-brutal flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E85B9C] text-white font-bold text-sm tracking-wide transition-all"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const { name, email, image } = session.user;

  const getInitial = () => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }
    if (email && email.length > 0) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    return name || email || "Student";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-[#FFFDF9] border-2 border-[#191919] shadow-brutal-sm hover:shadow-brutal transition-all active:translate-y-0.5"
      >
        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#FCE7F1] text-[#C93678] border border-[#191919] flex items-center justify-center font-extrabold text-sm">
          {image ? (
            <img
              src={image}
              alt={getDisplayName()}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitial()}</span>
          )}
        </div>

        {/* Name preview (desktop) */}
        <span className="hidden sm:inline-block text-xs font-bold text-[#191919] max-w-[120px] truncate">
          {getDisplayName()}
        </span>

        {/* Dropdown chevron */}
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#191919] transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          ></div>

          <div className="absolute right-0 mt-3 w-64 bg-[#FFFDF9] rounded-2xl shadow-brutal border-2 border-[#191919] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* User Profile Header */}
            <div className="p-3 bg-[#FCE7F1] rounded-xl border border-[#191919] mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white text-[#C93678] border border-[#191919] flex items-center justify-center font-black shrink-0">
                {image ? (
                  <img
                    src={image}
                    alt={getDisplayName()}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{getInitial()}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-[#191919] truncate">
                  {getDisplayName()}
                </p>
                <p className="text-xs font-medium text-[#6B6B6B] truncate">
                  {email}
                </p>
              </div>
            </div>

            {/* Menu Links */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#191919] hover:bg-[#F5F2EB] transition-colors text-left"
              >
                <LayoutDashboard className="w-4 h-4 text-[#E85B9C]" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  router.push("/mcq");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#191919] hover:bg-[#F5F2EB] transition-colors text-left"
              >
                <BookOpenCheck className="w-4 h-4 text-[#E85B9C]" />
                <span>Mock Tests</span>
              </button>

              <button
                onClick={() => {
                  router.push("/revision-cards");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#191919] hover:bg-[#F5F2EB] transition-colors text-left"
              >
                <WalletCards className="w-4 h-4 text-[#E85B9C]" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => {
                  router.push("/summary");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#191919] hover:bg-[#F5F2EB] transition-colors text-left"
              >
                <FileText className="w-4 h-4 text-[#E85B9C]" />
                <span>Summaries</span>
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E8E4DC] my-2"></div>

            {/* Sign Out */}
            <button
              onClick={() => {
                signOut({ callbackUrl: "/authpage" });
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
