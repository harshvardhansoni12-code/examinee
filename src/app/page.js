"use client";

import { BackGround } from "../../landing-page/components/background.jsx";
// import { NavBar } from "../../landing-page/components/navbar/navbar.jsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { session } = useSession();
  const router = useRouter();
  return session ? router.push("/dashboard") : router.push("/authpage");
}
