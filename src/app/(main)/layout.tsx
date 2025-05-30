import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import PageDirectory from "@/components/layout/PageDirectory";
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
          <section className="w-full p-4">
            <div className="flex justify-between rounded-md bg-white px-6 py-4">
              <h2 className="text-title font-semibold">Dashboard</h2>
              <PageDirectory />
            </div>
            <div className="mt-4 rounded-md bg-white px-6 py-4">{children}</div>
          </section>
        </SidebarProvider>
      </main>
    </>
  );
};

export default MainLayout;
