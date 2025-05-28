import LogoImage from "@/assets/images/logo.svg";
import LoginForm from "@/components/auth/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/main");
  }

  return (
    <>
      <div>
        <h2 className="mt-3 text-center">
          <Image src={LogoImage} alt="Tribe" className="inline-block max-w-[80px]" />
        </h2>
        <p className="mt-4 text-center text-sm text-gray-600">관리자 로그인</p>
      </div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
