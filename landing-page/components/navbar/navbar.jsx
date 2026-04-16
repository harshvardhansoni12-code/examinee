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
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-14 p-1 bg-slate-100 z-50">
      <button
        className=" text-3xl font-bold flex justify-center pl-1 hover:cursor-pointer"
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
