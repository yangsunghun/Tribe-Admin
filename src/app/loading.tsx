export default function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center">
      <div className="border-primary-400 border-t-primary-100 h-16 w-16 animate-spin rounded-full border-4"></div>
    </div>
  );
}
