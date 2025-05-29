import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
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
      <main className="bg-bg-light max-w-screen overflow-hidden pt-16">
        <SidebarProvider>
          <AppSidebar />
          <section>{children}</section>
        </SidebarProvider>
      </main>
    </>
  );
};

export default MainLayout;
