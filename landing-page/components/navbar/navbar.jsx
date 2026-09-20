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
    <nav className="fixed top-0 left-0 right-0 h-20 px-6 md:px-12 flex justify-between items-center bg-white z-50">
      <div
        className="text-2xl font-black tracking-tight text-slate-900 cursor-pointer"
        onClick={LogoClick}
      >
        Examinee
      </div>

      <div>
        <UserButton />
      </div>
    </nav>
  );
};
