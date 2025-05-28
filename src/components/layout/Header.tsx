"use client";

import LogoImage from "@/assets/images/logo.svg";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto w-[96vw]">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link href="/">
              <Image src={LogoImage} alt="Tribe" className="inline-block max-w-[80px]" />
            </Link>
          </div>
          <div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
