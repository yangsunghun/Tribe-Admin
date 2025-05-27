"use client";

import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">Tribe Admin</h1>
          </div>
          <div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
