"use client";
import { Options } from "./options";
import { UserButton } from "../../../auth/components/UserButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const NavBar = () => {
  const session = useSession();
  const router = useRouter();
  const Logo = () => {
    if (session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      router.push("/authpage");
      router.refresh();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-16 px-6 bg-white/60 backdrop-blur-md border-b border-orange-200/30 shadow-sm z-50 transition-all duration-300">
      <button
        className="text-2xl font-extrabold flex justify-center tracking-tight text-primary hover:opacity-80 transition-opacity hover:cursor-pointer"
        onClick={Logo}
      >
        Examinee
      </button>
      <div>
        <Options />
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};
