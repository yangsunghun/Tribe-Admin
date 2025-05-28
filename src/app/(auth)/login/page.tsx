import LogoImage from "@/assets/images/logo.svg";
import LoginForm from "@/components/auth/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/main");
  }

  return (
      <>
      <div>
        <h2 className="text-center mt-3">
          <Image src={LogoImage} alt="Tribe" className="max-w-[80px] inline-block"/>
        </h2>
        <p className="mt-4 text-center text-sm text-gray-600">
          관리자 로그인
        </p>
      </div>
      <LoginForm />
      </>
  );
} 