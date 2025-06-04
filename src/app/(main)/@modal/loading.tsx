import ModalBg from "@/components/etc/ModalBg";

export default function Loading() {
  return (
    <ModalBg>
      <div className="border-primary-400 border-t-primary-100 h-16 w-16 animate-spin rounded-full border-4"></div>
    </ModalBg>

    // <div className="fixed inset-0 z-[50] bg-bg-01"></div>
  );
}
