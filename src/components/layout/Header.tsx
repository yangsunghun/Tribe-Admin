"use client";

import LogoImage from "@/assets/images/logo.svg";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white">
      <div className="mx-auto flex h-16 w-[96vw] items-center justify-between">
        <h1>
          <Link href="/">
            <Image src={LogoImage} alt="Tribe" className="inline-block max-w-[80px]" />
          </Link>
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
