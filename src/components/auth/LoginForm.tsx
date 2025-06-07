"use client";

import Eye from "@/assets/icons/Eye";
import EyeSlash from "@/assets/icons/EyeSlash";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const EyeIcon = ({ visible }: { visible: boolean }) => {
  return visible ? <EyeSlash className="size-5 text-gray-500" /> : <Eye className="size-5 text-gray-500" />;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        // Handle error
      } else {
        router.push("/members/list");
      }
    } catch {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="mt-8 space-y-6">
      <div className="login-form-container space-y-3">
        <div className="group bg-bg-pale relative flex flex-col rounded-xl border border-gray-200 px-4 pt-3 pb-2 transition-all duration-150 focus-within:border-blue-500 focus-within:shadow-md">
          <label htmlFor="email" className="text-xs font-medium text-gray-500">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none bg-transparent p-0 text-sm outline-none"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>

        <div className="group bg-bg-pale relative flex flex-col rounded-xl border border-gray-200 px-4 pt-3 pb-2 transition-all duration-150 focus-within:border-blue-500 focus-within:shadow-md">
          <label htmlFor="password" className="text-xs font-medium text-gray-500">
            비밀번호
          </label>
          <div className="flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 border-none bg-transparent p-0 text-sm outline-none"
              placeholder="비밀번호를 입력하세요"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  );
}
