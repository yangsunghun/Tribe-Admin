import LoginForm from "@/components/auth/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/main");
  }

  return (
      <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tribe Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          관리자 로그인
        </p>
      </div>
      <LoginForm />
      </>
  );
} 