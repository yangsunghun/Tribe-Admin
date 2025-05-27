import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-03">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8">{children}</div>
    </div>
  );
}
