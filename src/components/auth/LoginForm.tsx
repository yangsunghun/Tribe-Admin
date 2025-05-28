"use client";

import Eye from "@/assets/icons/Eye";
import EyeSlash from "@/assets/icons/EyeSlash";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const EyeIcon = ({ visible }: { visible: boolean }) => {
  return visible ? <EyeSlash className="size-5 text-gray-500" /> : <Eye className="size-5 text-gray-500" />;
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        router.push("/main");
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && <div className="text-center text-sm text-red-500">{error}</div>}
      <div className="login-form-container space-y-3">
        <div className="group bg-bg-pale relative flex flex-col rounded-xl border border-gray-200 px-4 pt-3 pb-2 transition-all duration-150 focus-within:border-blue-500 focus-within:shadow-md">
          <label
            htmlFor="email"
            className="text-caption mb-1 text-gray-500 transition-colors duration-150 group-focus-within:text-blue-600"
          >
            Email Address / Username
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            className="border-none bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-400 outline-none"
            placeholder="아이디를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="group bg-bg-pale relative flex flex-col rounded-xl border border-gray-200 px-4 pt-3 pb-2 transition-all duration-150 focus-within:border-blue-500 focus-within:shadow-md">
          <label
            htmlFor="password"
            className="text-caption mb-1 text-gray-500 transition-colors duration-150 group-focus-within:text-blue-600"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="flex-1 border-none bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-400 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="ml-2 p-1 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group bg-primary-600 hover:bg-primary-700 relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
