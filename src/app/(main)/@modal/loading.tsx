import { DialogOverlay } from "@/components/ui/dialog";

export default function Loading() {
  return (
    <DialogOverlay>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </DialogOverlay>

    // <div className="fixed inset-0 z-[50] bg-bg-01"></div>
  );
}
