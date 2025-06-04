"use client";

import useLockScroll from "@/hooks/useLockScroll";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

type ModalBgProps = {
  children: ReactNode;
};

const ModalBg = ({ children }: ModalBgProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(true);

  useLockScroll(isOpen);

  // pathname이 변경되면 스크롤을 다시 활성화
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [pathname]);

  const handleClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      router.back();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      {children}
    </div>
  );
};

export default ModalBg;
