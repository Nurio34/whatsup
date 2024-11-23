"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function FooterClient() {
  const { user } = useAppSelector((s) => s.user);

  const path = usePathname().split("/")[1];

  const classCondition =
    (path === "login" && user) ||
    (path === "signup" && user) ||
    (path === "forget-password" && user) ||
    (path === "reset-password" && user) ||
    (path === "verify" && user?.isVerified) ||
    (path === "verify" && !user) ||
    (path === "new-user" && !user?.newUser) ||
    path === "logout";

  return (
    <footer
      className={`flex w-screen gap-[4vw] md:gap-[1vw] justify-center items-center flex-wrap
            ${classCondition && "fixed bottom-0 left-1/2 -translate-x-1/2"}
        `}
    >
      <Link
        href={"/"}
        className="c-btn relative w-10 aspect-square rounded-full"
      >
        <Image
          src={process.env.NEXT_PUBLIC_LOGO || "/logo-placeholder.svg"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority
          alt="logo link"
        />
      </Link>
      <Link
        href="/terms"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Terms
      </Link>
      <Link
        href="/privacy"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Privacy
      </Link>
      <Link
        href="/security"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Security
      </Link>
      <Link
        href="/status"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Status
      </Link>
      <Link
        href="/docs"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Docs
      </Link>
      <Link
        href="/contact"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Contact
      </Link>
      <Link
        href="/manage-cookies"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Manage Cookies
      </Link>
      <Link
        href="/do-not-share"
        className="text-sm hover:text-purple-400 hover:underline hover:underline-offset-4 min-w-max"
      >
        Do not share my personel information
      </Link>
    </footer>
  );
}

export default FooterClient;
