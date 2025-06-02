import AppSidebar from "@/components/layout/AppSidebar";
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
      <main className="bg-bg-light text-caption max-w-screen overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <section className="w-full p-4">
            <div className="min-h-[calc(100vh-2rem)] rounded-md bg-white px-6 py-4">
              <PageDirectory />
              <div className="pt-4">{children}</div>
            </div>
          </section>
        </SidebarProvider>
      </main>
    </>
  );
};

export default MainLayout;
