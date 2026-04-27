"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserButton } from "../../../auth/components/UserButton";

export const NavBar = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const LogoClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 px-6 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <div
        className="text-2xl font-black tracking-tight text-slate-900 cursor-pointer"
        onClick={LogoClick}
      >
        Examinee
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-500">
        <button className="text-slate-900 hover:text-indigo-600 transition-colors">
          Home
        </button>
        <button className="hover:text-indigo-600 transition-colors">
          Features
        </button>
        <button className="hover:text-indigo-600 transition-colors">
          Pricing
        </button>
        <button className="hover:text-indigo-600 transition-colors">
          About Us
        </button>
      </div>

      <div>
        <UserButton />
      </div>
    </nav>
  );
};
