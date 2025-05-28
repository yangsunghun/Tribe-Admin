import Header from "@/components/layout/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="bg-bg-light">{children}</main>
    </>
  );
};

export default MainLayout;
