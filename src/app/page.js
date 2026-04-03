"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const { session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      router.push("/authpage");
      router.refresh();
    }
  }, [session, status, router]);
  return <div></div>;
}
